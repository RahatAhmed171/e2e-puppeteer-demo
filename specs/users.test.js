/* Before testing the Food tracker app, its recommended to add some products to the store
*/



let loginAccount = require( '../actions/loginAccount' );

jest.setTimeout(60000);

describe('Basic authentication e2e tests', () => {
  let credential;
  beforeAll( async () => {
  // Set a definite site for the page viewport so view is consistent across browsers
    await page.setViewport( {
      width: 1366,
      height: 768,
      deviceScaleFactor: 1
    } );

    loginAccount = await loginAccount( page );
  })

  it( 'Should be able to log in and show the store name', async () => {
    // Make sure you have an account by this name in the app
    const storename = await loginAccount.login( 'Dummy9@gmail.com','123456789');
    page.waitFor( 2000 );
    expect(storename).toContain('Dummy9store');
  } );
  
  it( 'Should add a product and pop a dialog box displaying confirmation message', async () => {
    try {
      page.once( 'dialog', async dialog => {
        console.log(dialog.message())
        expect( dialog.message() ).toBe( 'Product inserted successfully' );
        await dialog.accept();
      });

      await loginAccount.add_a_product('Tea','Beverage')
      await page.waitFor(5000) //Wait for the dialog to accept the prompt before proceeding

    } catch(err){
      console.log("An error occured while testing => ", err)
    }
  })

  it( 'tries to  add a product without product type and pop a dialog box displaying error message', async () => {
    try {
      page.once( 'dialog', async dialog => {
        console.log(dialog.message())
        expect(dialog.message() ).toBe( 'Product type cant be empty' );
        await dialog.accept();
      });
 
      await loginAccount.add_a_product('Tea','')
      await page.waitFor(5000) 
      
      
      await page.click('.close')
    
     await page.waitFor( 2000 );
      

    } catch(err){
      console.log("An error occured while testing => ", err)
    }
  })
  

  it( 'tries to  add a product with same product name and pop a dialog box displaying duplication message', async () => {
    try {
      page.once( 'dialog', async dialog => {
        console.log(dialog.message())
        expect(dialog.message() ).toBe( "Product with that name already exists" );
        await dialog.accept();
      });
    
      await loginAccount.add_a_product('Tea','Beverage')
      await page.waitFor(5000) 
     
     
    } catch(err){
      console.log("An error occured while testing => ", err)
    }
  })

  it( 'Should update the product expiry date and pop a dialog box displaying updation message', async () => {
    try {
      page.once( 'dialog', async dialog => {
        console.log(dialog.message())
        expect( dialog.message() ).toBe( 'Product updated successfully' );
        await dialog.accept();
      });

      await loginAccount.update_a_product()
      await page.waitFor(5000) 

    } catch(err){
      console.log("An error occured while trying to login => ", err)
    }
  })

  
  
  
  
  
  it( 'Should delete the product and pop a dialog box displaying deletion message', async () => {
    try {
      page.once( 'dialog', async dialog => {
        console.log(dialog.message())
        expect(dialog.message() ).toBe( 'Product deleted successfully' );
        await dialog.accept();
      });

      await loginAccount.delete_a_product()
      await page.waitFor(5000) 
      await page.click('#logout_btn');
      await page.waitFor( 2000 );
    } catch(err){
      console.log("An error occured while trying to login => ", err)
    }
  })


  it( 'tries to login with wrong credentials and pop a dialog box displaying login fail message', async () => {
    try {
      page.once( 'dialog', async dialog => {
        console.log(dialog.message())
        expect(dialog.message() ).toBe( 'Login Unsuccessful' );
        await dialog.accept();
      });
      await page.waitFor('#form-user');
    
      await page.type('#input-email','Dummy9@gmail.com' );
      await page.waitFor( 1000 );
			
      await page.type('#input-password', 'test1234567' );
      await page.waitFor( 1000 );

      await page.click('#button-login');
      await page.waitFor(5000)


    

    } catch(err){
      console.log("An error occured while testing => ", err)
    }
  })
  

})
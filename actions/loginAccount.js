const chalk = require( 'chalk' );


class LoginAccount {
  constructor( page ) {
    this.url = "http://127.0.0.1:1234/login"
    this.page = page;
   
  }
  async login( username, password ) {
    try {
      await this.page.goto( this.url );
      await this.page.waitFor('#form-user');
    

      // Type the login credentials into the input fields
      await this.page.type('#input-email',username );
      await this.page.waitFor( 1000 );
			
      await this.page.type('#input-password', password );
      await this.page.waitFor( 1000 );

      await this.page.click('#button-login');

      // Wait for homepage to load 
      await this.page.waitFor( '#store_nme' );
      await this.page.waitFor( 3000 );
 
      const storename = await this.page.$eval( '#store_nme', el =>  el.textContent );
      await this.page.waitFor( 1000 );
      return storename;
    } catch ( err ) {
      console.log( chalk.red( 'ERROR => ', err ) );
    }
  }
  async add_a_product(product_name,product_type){
    try{
      await this.page.waitFor('#create_product')
      await this.page.click('#create_product')
      await this.page.waitFor('#form-user')
      await this.page.type('#input-pname',product_name );
      await this.page.type('#input-ptype',product_type );
      await this.page.$eval( '#input-pdate', el =>  el.value ='2022-10-28');
      

      await this.page.waitFor( 1000 )
      
      const add_button=await this.page.$('#button-add')
      add_button.click()
      await this.page.waitFor( 4000 );
       
      
    }
    catch(err){
      console.log( chalk.red( 'ERROR => ', err ) );
    }
  }
  async update_a_product(){
    //it will update the first product of the store
    try{

      await this.page.waitFor('#container > div:nth-child(10) > p.product_name')
      await this.page.click('#container > div:nth-child(10) > p.product_name')
      await this.page.waitFor('#form-user')
      const button=await this.page.$('#button-edit')
      button.click()
      await this.page.waitFor( 2000 )
      await this.page.$eval( '#input-pdate', el =>  el.value ='2022-10-30');
      await this.page.waitFor( 1000 )
      
      const save_button=await this.page.$('#button-save')
      save_button.click()
      await this.page.waitFor( 4000 );


    }
    catch ( err ) {
      console.log( chalk.red( 'ERROR => ', err ) );
    }
  }

  async delete_a_product() {
    // it will delete the first product of the store
    try {
    await this.page.waitFor('#container > div:nth-child(10) > p.product_name')
    await this.page.click('#container > div:nth-child(10) > p.product_name')
    await this.page.waitFor('#form-user')
    const button=await this.page.$('#button-del')
    button.click()
    await this.page.waitFor( 4000 )
  
    }
    catch ( err ) {
      console.log( chalk.red( 'ERROR => ', err ) );
    }

  }

}

module.exports = ( page ) => new LoginAccount( page );

class ConstantsLogin{

    //Credentials to test login
    email_to_login ='jhosedithbravo.23ar@gmail.com'
    password_to_login = 'Welcome01!'
    password_wrong_to_login ='Welcome!'

    //locators login page
     locator_login_path = ".//a[contains(@href,'https://www.evernote.com/Login.action') and text()='Log In']"
     locator_username_by_id= 'username'
     locator_password_by_id='password'

     //locators home page
     locator_button_login_by_id='loginButton'
     locator_createNote_button_by_id = 'qa-HOME_NOTE_WIDGET_CREATE_NOTE'
     locator_frame_document_by_id= 'qa-COMMON_EDITOR_IFRAME'

     //locators note 
     locator_title_note_by_xpath = "//div[contains(@class, 'P0rnC')]//textarea[contains(@class, 'dSbRl s9EjL')]"
     locator_description_note_by_xpath = "//div[contains(@class, 'para')]//br[contains(@class, 'ProseMirror-trailingBreak')]"
     
     title_note ='Automation testing by Jhosedith'
     description_note='Automation testing using nodejs, selenium with cucumber'

     //locators options button logout
     locator_option_logout_by_xpath= '//li[contains(@class, "UyggXMRtZuBvlSJ5dJsD")]//div[@id= "qa-NAV_USER"]'
     locator_logout_button_by_xpath= '//li[contains(@class, "ivs2kscNg5rtC99cXXHO")]//a[@id= "qa-ACCOUNT_DROPDOWN_LOGOUT"]'


     locator_message_logout_by_id= 'qa-LOGOUT_CONFIRM_DIALOG_MESSAGE';
     Locator_Confirm_Logout= 'qa-LOGOUT_CONFIRM_DIALOG_CANCEL'
     locator_note_created=".//button[contains(@type,'button')]//div[contains(@class,'Fuix_q8N7ezroVVJ104t')]"
     locator_click_created= ".//div[contains(@class,'Fuix_q8N7ezroVVJ104t')]"
     locator_title_on_note_created = ".//button[contains(@type,'button')]//div[contains(@class,'Fuix_q8N7ezroVVJ104t')]//span[1]"

     locator_options_note= ".//div[contains(@aria-controls,'qa-ACTIONS_MODAL')]//button[contains(@type,'button')]"
     locator_option_delete_note = ".//ul[@id='default_dropdown_id']//li[contains(@role,'menuitem')]//a[@id='qa-ACTION_DELETE']"
}
module.exports =ConstantsLogin;
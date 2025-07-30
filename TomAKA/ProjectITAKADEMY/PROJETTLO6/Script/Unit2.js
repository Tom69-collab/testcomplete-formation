function Exercice_3()
{
  //Launches the specified browser and opens the specified URL in it.
  Browsers.Item(btChrome).Run("https://demoqa.com/");
  //Simulates a left-button single click in a window or control as specified (relative position, shift keys).
  Aliases.browser.pageDemoqa.textnode.Click();
  //Simulates a left-button single click in a window or control as specified (relative position, shift keys).
  Aliases.browser.pageDemoqa2.textnodePracticeForm.textnodeItem0.Bouton_formulaire.Click();
  //Posts an information message to the test log.
  Log.Message("Ouverture de la page du formulaire\r\n", "");
  //entrer le prénom
  Aliases.browser.pageDemoqa3.formUserform.textboxFirstname.SetText("Tom");
  //Enters text in the text box.
  Aliases.browser.pageDemoqa3.formUserform.textboxLastname.SetText("A");
  //commentaire
  //
  //Enters text in the text box.
  Aliases.browser.pageDemoqa3.formUserform.textboxUseremail.SetText("Tom@IT.com");
  //Posts an information message to the test log.
  Log.Message("Les noms, prenoms et mail ont bien été saisis", "");
  //Simulates a left-button single click in a window or control as specified (relative position, shift keys).
  Aliases.browser.pageDemoqa3.formUserform.labelMale.Click();
  //entrer le numéro de téléphone
  Aliases.browser.pageDemoqa3.formUserform.textboxUsernumber.SetText("0707070707");
  //Enters text in the text box.
  Aliases.browser.pageDemoqa3.formUserform.textboxDateofbirthinput.SetText("22011978");
  Aliases.browser.pageDemoqa3.formUserform.panel.textContent = "eeee";
  //Simulates a left-button single click in a window or control as specified (relative position, shift keys).
  Aliases.browser.pageDemoqa3.formUserform.labelMusic.Click();
  Aliases.browser.pageDemoqa3.formUserform.textareaCurrentaddress.textContent = "149, rue Barreyre 33300 BDX";
  //Clicks the 'vg' control.
  Aliases.browser.pageDemoqa3.formUserform.vg.Click();
  //Clicks the 'panelReactSelect3Option1' control.
  Aliases.browser.pageDemoqa3.formUserform.panelReactSelect3Option1.Click();
  //Clicks the 'textnode' control.
  Aliases.browser.pageDemoqa3.formUserform.textnode.Click();
  //Clicks the 'panelReactSelect4Option1' control.
  Aliases.browser.pageDemoqa3.formUserform.panelReactSelect4Option1.Click();
  //Clicks the 'buttonSubmit' button.
  Aliases.browser.pageDemoqa3.formUserform.buttonSubmit.ClickButton();
  //Posts an information message to the test log.
  Log.Message("Ouverture du récapitulatif", "");
  //Closes the specified Window object.
  Aliases.browser.BrowserWindow.Close();
}
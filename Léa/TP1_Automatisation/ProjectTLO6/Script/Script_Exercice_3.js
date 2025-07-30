function Exercice_03()
{
  //Launches the specified browser and opens the specified URL in it.
  Browsers.Item(btChrome).Run("https://demoqa.com/automation-practice-form");
  //Maximizes the specified Window object.
  Aliases.browser.BrowserWindow.Maximize();
  //Sets the text 'Jane' in the 'textboxFirstname' text editor.
  Aliases.browser.pageDemoqa.formUserform.textboxFirstname.SetText("Jane");
  //Sets the text 'Doe' in the 'textboxLastname' text editor.
  Aliases.browser.pageDemoqa.formUserform.textboxLastname.SetText("Doe");
  //Sets the text 'jane.doe@email.com' in the 'textboxUseremail' text editor.
  Aliases.browser.pageDemoqa.formUserform.textboxUseremail.SetText("jane.doe@email.com");
  //Clicks the 'labelFemale' control.
  Aliases.browser.pageDemoqa.formUserform.labelFemale.Click();
  //Sets the text '0000000000' in the 'textboxUsernumber' text editor.
  Aliases.browser.pageDemoqa.formUserform.textboxUsernumber.SetText("0000000000");
  //Clicks the 'textboxDateofbirthinput' control.
  Aliases.browser.pageDemoqa.formUserform.textboxDateofbirthinput.Click();
  //Selects the '1989' item of the 'select' combo box.
  Aliases.browser.pageDemoqa.formUserform.select.ClickItem("1989");
  //Selects the 'March' item of the 'select2' combo box.
  Aliases.browser.pageDemoqa.formUserform.select2.ClickItem("March");
  //Clicks the 'panelChooseMondayMarch13th1989' control.
  Aliases.browser.pageDemoqa.formUserform.panelChooseMondayMarch13th1989.Click();
  //Clicks the 'panel' control.
  Aliases.browser.pageDemoqa.formUserform.panel.Click();
  //Sets the text 'ksodko' in the 'textboxSubjectsinput' text editor.
  Aliases.browser.pageDemoqa.formUserform.textboxSubjectsinput.SetText("ksodko");
  //Clicks the 'labelSports' control.
  Aliases.browser.pageDemoqa.formUserform.labelSports.Click();
  //Enters '123 [Caps]A[Caps]vz[BS]ene[BS]ue de la [Caps]P[Caps]aix' in the 'textareaCurrentaddress' object.
  Aliases.browser.pageDemoqa.formUserform.textareaCurrentaddress.Keys("123 [Caps]A[Caps]vz[BS]ene[BS]ue de la [Caps]P[Caps]aix");
  //Clicks the 'fileSelectPicture' control.
  Aliases.browser.pageDemoqa.formUserform.fileSelectPicture.Click();
  //Double-clicks the 'BaselineImage' object.
  Aliases.browser.dlgOuvrir.DUIViewWndClassName.Volet_de_l_Explorateur.CtrlNotifySink2.ShellView.Vue_d_l_ments.avatar_ia_v1_2025.BaselineImage.DblClick(58, 41);
  //Clicks the 'textnode' control.
  Aliases.browser.pageDemoqa.formUserform.textnode.Click();
  //Clicks the 'panelReactSelect3Option0' control.
  Aliases.browser.pageDemoqa.formUserform.panelReactSelect3Option0.Click();
  //Clicks the 'vg2' control.
  Aliases.browser.pageDemoqa.formUserform.vg2.Click();
  //Clicks the 'panelReactSelect4Option0' control.
  Aliases.browser.pageDemoqa.formUserform.panelReactSelect4Option0.Click();
  //Clicks the 'buttonSubmit' button.
  Aliases.browser.pageDemoqa.formUserform.buttonSubmit.ClickButton();
  //Closes the specified Window object.
  Aliases.browser.BrowserWindow.Close();
}
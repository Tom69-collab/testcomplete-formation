function exo_5()
{
  //Launches the specified browser and opens the specified URL in it.
  Browsers.Item(btChrome).Run("https://demoqa.com/automation-practice-form");
  //Sets the specified position and size for the specific BrowserWindow object.
  Aliases.browser.BrowserWindow.Position(649, 43, 1304, 1047);
  //Posts an information message to the test log.
  Log.Message("Ouverture du formulaire", "");
  Aliases.browser.pageDemoqa.formUserform.textboxFirstname.Text = "Simon";
  //Captures the image of the specified rectangular area of the object.
  Aliases.browser.pageDemoqa.formUserform.textboxFirstname.Picture();
  //Je rentre mon prénom
  //Enters text in the text box.
  Aliases.browser.pageDemoqa.formUserform.textboxLastname.SetText("Florino");
  //Captures the image of the specified rectangular area of the object.
  Aliases.browser.pageDemoqa.formUserform.textboxLastname.Picture();
  //Clicks the 'textboxUseremail' control.
  Aliases.browser.pageDemoqa.formUserform.textboxUseremail.Click();
  //Enters '~^à' in the 'textboxUseremail' object.
  Aliases.browser.pageDemoqa.formUserform.textboxUseremail.Keys("~^à");
  //Sets the text 's.florino@it-students.fr' in the 'textboxUseremail' text editor.
  Aliases.browser.pageDemoqa.formUserform.textboxUseremail.SetText("s.florino@it-students.fr");
  //Clicks the 'labelMale' control.
  Aliases.browser.pageDemoqa.formUserform.labelMale.Click();
  //Clicks the 'textboxUsernumber' control.
  Aliases.browser.pageDemoqa.formUserform.textboxUsernumber.Click();
  //Sets the text '0606060606' in the 'textboxUsernumber' text editor.
  Aliases.browser.pageDemoqa.formUserform.textboxUsernumber.SetText("0606060606");
  //Clicks the 'textboxDateofbirthinput' control.
  Aliases.browser.pageDemoqa.formUserform.textboxDateofbirthinput.Click();
  //Selects the '1993' item of the 'select' combo box.
  Aliases.browser.pageDemoqa.formUserform.select.ClickItem("1993");
  //Clicks the 'panelChooseTuesdayJuly6th1993' control.
  Aliases.browser.pageDemoqa.formUserform.panelChooseTuesdayJuly6th1993.Click();
  //Clicks the 'panel' control.
  Aliases.browser.pageDemoqa.formUserform.panel.Click();
  //Clicks the 'panel' control.
  Aliases.browser.pageDemoqa.formUserform.panel.Click();
  //Sets the text '' in the 'textboxSubjectsinput' text editor.
  Aliases.browser.pageDemoqa.formUserform.textboxSubjectsinput.SetText("");
  //Sets the text '' in the 'textboxSubjectsinput' text editor.
  Aliases.browser.pageDemoqa.formUserform.textboxSubjectsinput.SetText("");
  //Sets the text '' in the 'textboxSubjectsinput' text editor.
  Aliases.browser.pageDemoqa.formUserform.textboxSubjectsinput.SetText("");
  //Sets the text '' in the 'textboxSubjectsinput' text editor.
  Aliases.browser.pageDemoqa.formUserform.textboxSubjectsinput.SetText("");
  //Sets the text 'I' in the 'textboxSubjectsinput' text editor.
  Aliases.browser.pageDemoqa.formUserform.textboxSubjectsinput.SetText("I");
  //Enters '^a' in the 'textboxSubjectsinput' object.
  Aliases.browser.pageDemoqa.formUserform.textboxSubjectsinput.Keys("^a");
  //Sets the text 'Compu' in the 'textboxSubjectsinput' text editor.
  Aliases.browser.pageDemoqa.formUserform.textboxSubjectsinput.SetText("Compu");
  //Clicks the 'panelReactSelect2Option0' control.
  Aliases.browser.pageDemoqa.formUserform.panelReactSelect2Option0.Click();
  //Clicks the 'labelSports' control.
  Aliases.browser.pageDemoqa.formUserform.labelSports.Click();
  //Clicks the 'labelMusic' control.
  Aliases.browser.pageDemoqa.formUserform.labelMusic.Click();
  //Clicks the 'fileSelectPicture' control.
  Aliases.browser.pageDemoqa.formUserform.fileSelectPicture.Click();
  //Rotates the mouse wheel to -8 over the 'Nom' object.
  Aliases.browser.dlgOuvrir.DUIViewWndClassName.Volet_de_l_Explorateur.CtrlNotifySink.ShellView.Vue_d_l_ments.Semaine_derni_re.R_sum_chapitre_4.Nom.MouseWheel(-8);
  //Rotates the mouse wheel to -1 over the 'Nombre' object.
  Aliases.browser.dlgOuvrir.DUIViewWndClassName.Volet_de_l_Explorateur.CtrlNotifySink.ShellView.Vue_d_l_ments.Plus_t_t_dans_le_mois.Plus_t_t_dans_le_mois_34_.Nombre.MouseWheel(-1);
  //Rotates the mouse wheel to -6 over the 'Nom' object.
  Aliases.browser.dlgOuvrir.DUIViewWndClassName.Volet_de_l_Explorateur.CtrlNotifySink.ShellView.Vue_d_l_ments.Plus_t_t_dans_le_mois.Qualit_logicielle_Fondamentaux.Nom.MouseWheel(-6);
  //Rotates the mouse wheel to -1 over the 'Nom' object.
  Aliases.browser.dlgOuvrir.DUIViewWndClassName.Volet_de_l_Explorateur.CtrlNotifySink.ShellView.Vue_d_l_ments.Plus_t_t_dans_le_mois.entretien_SDR.Nom.MouseWheel(-1);
  //Rotates the mouse wheel to -6 over the 'Nom' object.
  Aliases.browser.dlgOuvrir.DUIViewWndClassName.Volet_de_l_Explorateur.CtrlNotifySink.ShellView.Vue_d_l_ments.Plus_t_t_dans_le_mois.evershop_test_cases.Nom.MouseWheel(-6);
  //Rotates the mouse wheel to 1 over the 'Nom' object.
  Aliases.browser.dlgOuvrir.DUIViewWndClassName.Volet_de_l_Explorateur.CtrlNotifySink.ShellView.Vue_d_l_ments.Plus_t_t_dans_le_mois.chromaprint_fpcalc_1_5_1_windows_x86_64.Nom.MouseWheel(1);
  //Rotates the mouse wheel to 3 over the 'Nom' object.
  Aliases.browser.dlgOuvrir.DUIViewWndClassName.Volet_de_l_Explorateur.CtrlNotifySink.ShellView.Vue_d_l_ments.Plus_t_t_dans_le_mois.utilisateurs.Nom.MouseWheel(3);
  //Rotates the mouse wheel to 1 over the 'Nom' object.
  Aliases.browser.dlgOuvrir.DUIViewWndClassName.Volet_de_l_Explorateur.CtrlNotifySink.ShellView.Vue_d_l_ments.Plus_t_t_dans_le_mois.ceinture.Nom.MouseWheel(1);
  OCR.Recognize(Aliases.browser.dlgOuvrir.DUIViewWndClassName.Volet_de_l_Explorateur.CtrlNotifySink.ShellView.Vue_d_l_ments.Plus_t_t_dans_le_mois.ceinture.Nom).BlockByText("ceinture").DblClick();
  //Clicks the 'textareaCurrentaddress' control.
  Aliases.browser.pageDemoqa.formUserform.textareaCurrentaddress.Click();
  //Enters 'Coucou ceci est mon adresse.' in the 'textareaCurrentaddress' object.
  Aliases.browser.pageDemoqa.formUserform.textareaCurrentaddress.Keys("Coucou ceci est mon adresse.");
  //Clicks the 'panel2' control.
  Aliases.browser.pageDemoqa.formUserform.panel2.Click();
  //Clicks the 'panelReactSelect3Option3' control.
  Aliases.browser.pageDemoqa.formUserform.panelReactSelect3Option3.Click();
  //Clicks the 'panelSelectCity' control.
  Aliases.browser.pageDemoqa.formUserform.panelSelectCity.Click();
  //Clicks the 'panelReactSelect4Option0' control.
  Aliases.browser.pageDemoqa.formUserform.panelReactSelect4Option0.Click();
  //Clicks the 'buttonSubmit' button.
  Aliases.browser.pageDemoqa.formUserform.buttonSubmit.ClickButton();
  //Clicks the 'cell' control.
  Aliases.browser.pageDemoqa.cell.Click();
  //Clicks the 'cell2' control.
  Aliases.browser.pageDemoqa.cell2.Click();
  //Clicks the 'cell3' control.
  Aliases.browser.pageDemoqa.cell3.Click();
  //Clicks the 'cell4' control.
  Aliases.browser.pageDemoqa.cell4.Click();
  //Clicks the 'cell5' control.
  Aliases.browser.pageDemoqa.cell5.Click();
  //Clicks the 'cell6' control.
  Aliases.browser.pageDemoqa.cell6.Click();
  //Clicks the 'cell7' control.
  Aliases.browser.pageDemoqa.cell7.Click();
  //Clicks the 'cell8' control.
  Aliases.browser.pageDemoqa.cell8.Click();
  //Clicks the 'cell9' control.
  Aliases.browser.pageDemoqa.cell9.Click();
  //Clicks the 'cell10' control.
  Aliases.browser.pageDemoqa.cell10.Click();
  //Clicks the 'cell11' control.
  Aliases.browser.pageDemoqa.cell11.Click();
  //Clicks the 'buttonCloselargemodal' button.
  Aliases.browser.pageDemoqa.buttonCloselargemodal.ClickButton();
}
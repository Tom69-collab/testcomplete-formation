function Exercice_01()
{
  //Launches the specified browser and opens the specified URL in it.
  Browsers.Item(btChrome).Run("https://www.it-akademy.fr/");
  //Closes the 'BrowserWindow' window.
  Aliases.browser.BrowserWindow.Close();
}
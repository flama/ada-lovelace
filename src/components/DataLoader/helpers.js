const config = {
  clientId: '373980611688-pc4jsmrc5al589kjgpdt5enghesutl9v.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
  spreadsheetId: '18VumVINXYypPAPA5aqLhw-BoFHqb5CGCrDI3JeBIs6I',
  discovery: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
}

function loadData(isSignedIn)
{
  if(isSignedIn)
  {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: config.spreadsheetId,
      range: 'A1'
    })
    .then(response => {
      console.warn(response)
    }, error => console.error(error))
  }
  else console.error("Error while signin in")
}

function initClient()
{
  window.gapi.client.init({
    'discoveryDocs': config.discovery,
    'clientId': config.clientId,
    'scope': config.scope
  })
  .then(() => {
    window.gapi.auth2.getAuthInstance()
      .isSignedIn
      .listen(loadData)

    window.gapi.auth2.getAuthInstance().signIn()

    loadData(window.gapi.auth2.getAuthInstance().isSignedIn.get())
  }, error => console.error(error))
}

function load(immediate)
{
  window.gapi.load('client:auth2', () => {
    initClient()
  })
}

export {
  load
}

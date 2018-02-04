module.exports = {
  'visit': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)

      .assert.elementPresent('.header')
      .assert.elementPresent('.el-form')
      .assert.elementPresent('[name="To"]')
      .assert.elementPresent('[name="Subject"]')
      .assert.elementPresent('[name="Message"]')
      .assert.elementPresent('.submit button')
      .assert.containsText('.header h1', 'New message')

      .end()
  }
}

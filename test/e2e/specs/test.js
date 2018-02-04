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
      .assert.elementPresent('.actions-submit button')
      .assert.containsText('.header h1', 'New message')

      // Test a prevented submission
      // (Missing recipient)
      .click('.actions-submit button')
      .pause(500)
      .assert.visible('.el-message-box__wrapper')

      // Test a prevented submission
      // (Missing subject)
      .setValue('input[name="To"]', ['test@test.com', browser.Keys.ENTER])
      .click('.actions-submit button')
      .pause(500)
      .assert.visible('.el-message-box__wrapper')

      .end()
  },


}

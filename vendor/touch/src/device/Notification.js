/**
 * Provides a cross device way to show notifications. There are three different implementations:
 *
 * - Sencha Packager
 * - Cordova
 * - Simulator
 *
 * When this singleton is instantiated, it will automatically use the correct implementation depending on the current device.
 *
 * Both the Sencha Packager and Cordova versions will use the native implementations to display the notification. The
 * Simulator implementation will use {@link Ext.MessageBox} for {@link #show} and a simply animation when you call {@link #vibrate}.
 *
 * ## Examples
 *
 * To show a simple notification:
 *
 *     Ext.device.Notification.show({
 *         title: 'Verification',
 *         message: 'Is your email address: test@sencha.com',
 *         buttons: Ext.MessageBox.OKCANCEL,
 *         callback: function(button) {
 *             if (button === "ok") {
 *                 console.log('Verified');
 *             } else {
 *                 console.log('Nope');
 *             }
 *         }
 *     });
 *
 * To make the device vibrate:
 *
 *     Ext.device.Notification.vibrate();
 *     
 * For more information regarding Native APIs, please review our [Native APIs guide](../../../packaging/native_apis.html).
 *
 * @mixins Ext.device.notification.Abstract
 */
Ext.define('Ext.device.Notification', {
    singleton: true,

    requires: [
        'Ext.device.Communicator',
        'Ext.device.notification.Cordova',
        'Ext.device.notification.Sencha',
        'Ext.device.notification.Simulator'
    ],

    constructor: function() {
        var browserEnv = Ext.browser.is;

        if (browserEnv.WebView) {
            if (browserEnv.Cordova) {
                return Ext.create('Ext.device.notification.Cordova');
            } else if (browserEnv.Sencha) {
                return Ext.create('Ext.device.notification.Sencha');
            }
        }

        return Ext.create('Ext.device.notification.Simulator');
    }
});

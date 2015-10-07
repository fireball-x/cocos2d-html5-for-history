﻿// jshint ignore: start

module('getClassName');

test('test', function() {
    var Asset = function () {};
    cc.js.setClassName('Asset', Asset);

    var MyAsset = (function () {
        var _super = Asset;

        function MyAsset () {
            _super.call(this);
        }
        cc.js.extend(MyAsset, _super);
        cc.js.setClassName('Foo', MyAsset);

        return MyAsset;
    })();
    var myAsset = new MyAsset();

    equal(cc.js.getClassName(myAsset), 'Foo', 'can getClassName of user type');

    delete MyAsset.prototype.__classname__;  // hack, remove class name
    ok(cc.js.getClassName(myAsset), 'should fallback to constructor name if classname undefined');
    // (constructor's name may renamed by uglify, so we do not test the value exactly)

    var asset = new Asset();
    notEqual(cc.js.getClassName(myAsset), cc.js.getClassName(asset), 'class name should not achieved from its super');

    cc.js.unregisterClass(Asset, MyAsset);

    equal(cc.js.getClassName(function () {}), '', 'class name should be "" if undefined');
});

// jshint ignore: end

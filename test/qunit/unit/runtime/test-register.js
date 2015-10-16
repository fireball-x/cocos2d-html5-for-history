module('register');

test('basic', function() {
    var MyNode = cc.Class();
    var MyNodeWrapper = cc.Class({
        extends: cc.Runtime.NodeWrapper,
        attached: function () {}
    });
    cc.Runtime.registerNodeType(MyNode, MyNodeWrapper);

    strictEqual(cc.getWrapperType(MyNode), MyNodeWrapper, 'getWrapperType should return registered wrapper type');

    var node = new MyNode();
    var wrapper = cc(node);
    ok(wrapper instanceof MyNodeWrapper, 'cc() should create registered wrapper');
    strictEqual(cc(node), wrapper, 'cc() should return created registered wrapper');

    strictEqual(wrapper.targetN, node, 'wrapper target should be node');

    //var mixinOpt = cc.getMixinOptions();
    //ok(mixinOpt, 'has default mixin options');
    //
    //var newMixinOpt = {};
    //cc.Runtime.registerMixin(newMixinOpt);
    //strictEqual(cc.getMixinOptions(), newMixinOpt, 'can get registered mixin options');
    //
    //// restore
    //cc.Runtime.registerMixin(mixinOpt);
});

//test('cc.SceneWrapperImpl', function() {
//    var MyScene = cc.Class();
//    var MySceneWrapper = cc.Class({
//        extends: cc.Runtime.SceneWrapper
//    });
//    cc.Runtime.registerNodeType(MyScene, MySceneWrapper);
//
//    strictEqual(cc.SceneWrapperImpl, MySceneWrapper, 'cc.SceneWrapperImpl should return registered SceneWrapper');
//});

angular.module('tracker').directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        elm.on('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                scope.$apply(attr.whenScrolled);
            }
        });
    };
});
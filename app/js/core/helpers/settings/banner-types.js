define(
    'settings/banner-types',
    function() {
        var bannerTypes = function() {
            return {
                debate: {
                    name: 'Debate',
                    height: 300,
                    minHeight: 10,
                    maxHeight: 500,
                    redirectUrlMaxLength:200
                }
            }
        };

        bannerTypes.moduleName = 'bannerTypes';
        bannerTypes.toExecute = true;

        return bannerTypes;
    }
);
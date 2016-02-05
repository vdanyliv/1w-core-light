define(
    'settings/auto-complete',
    function() {
        var autoComplete = function() {
            return {
                defaultAutoCompleteInputDelay: 1500,
                autoCompleteInputMinLength: 3,
                autoCompleteResultsLength: 10
            }
        };

        autoComplete.moduleName = 'autoComplete';
        autoComplete.toExecute = true;

        return autoComplete;
    }
);
<tpl id="tplDemo">
    <h3>this is Demo tpl</h3>

    <div id="child1-container">&nbsp;</div>
    <div id="child2-container">&nbsp;</div>
</tpl>

<tpl id="tplChild1">
    Child-1 tpl
</tpl>

<tpl id="tplChild2">
    Child-2 tpl

    <br>
    <br>
    <%= $.i18n.prop('overall.survey_manager.builder.add_page') %>
</tpl>
Template.myTemplate.events({
    'click .myButton': function() {
        // Define the pdf-document
        var docDefinition = { 
        	header: 'simple text',
        	content: 'My Text' 
        };

        // Start the pdf-generation process
        pdfMake.createPdf(docDefinition).open();
    }
});
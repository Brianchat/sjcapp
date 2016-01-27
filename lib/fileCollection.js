myData = FileCollection({                                              
  resumable: true,                                                     
  resumableIndexName: 'test',                                          
  http: [                                                              
    {                                                                  
      method: 'get',                                                   
      path: '/md5/:md5',                                               
      lookup: function(params, query) {                                
        return {                                                       
          md5: params.md5                                              
        };                                                             
      }                                                                
    }                                                                  
  ]                                                                    
});                                                                    
                                                                      
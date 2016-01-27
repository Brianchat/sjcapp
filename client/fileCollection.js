// Add the 'drag and drop' file upload functionality to the table
Template.collTest.onRendered(function() {                            
  myData.resumable.assignDrop($('.fileDrop'));                       
});    


Meteor.startup(function() {                                          
  // This get called when the resumable.js library starts a file uplod. 
  myData.resumable.on('fileAdded', function(file) {                  
    // We set a session variable with the name of the file.
    // This session variable is referenced in the uploadStatus and uploadProgress helpers
    // This means the table is updated as the file is loaded.
    Session.set(file.uniqueIdentifier, 0);                           
    return myData.insert({                                           
      _id: file.uniqueIdentifier,                                    
      filename: file.fileName,                                       
      contentType: file.file.type                                    
    }, function(err, _id) {                                          
      if (err) {                                                     
        console.warn("File creation failed!", err);                  
        return;                                                      
      }                                                              
      return myData.resumable.upload();                              
    });                                                              
  });
  // called multiple times while the file is uploading.                                                                
  myData.resumable.on('fileProgress', function(file) {               
    return Session.set(file.uniqueIdentifier, Math.floor(100 * file.progress()));
  });
  // called when file is loaded successfully                                                               
  myData.resumable.on('fileSuccess', function(file) {                
    return Session.set(file.uniqueIdentifier, void 0);               
  });                          
  // called if the upload fails                                      
  return myData.resumable.on('fileError', function(file) {           
    console.warn("Error uploading", file.uniqueIdentifier);          
    return Session.set(file.uniqueIdentifier, void 0);               
  });                                                                
});

// We need to load the user's documents when they sign in.
Tracker.autorun(function() {                                         
  var userId;                                                        
  userId = Meteor.userId();                                          
  Meteor.subscribe('allData', userId);                               
  return $.cookie('X-Auth-Token', Accounts._storedLoginToken());     
}); 

// Method to shorten the file name intelligently. 
shorten = function(name, w) {                                        
  if (w == null) {                                                   
    w = 16;                                                          
  }                                                                  
  w += w % 4;                                                        
  w = (w - 4) / 2;                                                   
  if (name.length > 2 * w) {                                         
    return name.slice(0, +w + 1 || 9e9) + '…' + name.slice(-w - 1);  
  } else {                                                           
    return name;                                                     
  }                                                                  
};                                                                   
Template.collTest.events({                                           
  'click .del-file': function(e, t) {                                
    return myData.remove({                                           
      _id: this._id                                                  
    });                                                              
  }                                                                  
});                                                                  
Template.collTest.helpers({                                          
  dataEntries: function() {                                          
    return myData.find({});                                          
  },                                                                 
  shortFilename: function(w) {                                       
    var ref;                                                         
    if (w == null) {                                                 
      w = 16;                                                        
    }                                                                
    if ((ref = this.filename) != null ? ref.length : void 0) {       
      return shorten(this.filename, w);                              
    } else {                                                         
      return "(no filename)";                                        
    }                                                                
  },                                                                 
  owner: function() {                                                
    var ref, ref1;                                                   
    return (ref = this.metadata) != null ? (ref1 = ref._auth) != null ? Meteor.users.findOne('SpQgZmfbPcxrhnxde').profile.name : void 0 : void 0;
  },                                                                 
  id: function() {                                                   
    return "" + this._id;                                            
  },                                                                 
  link: function() {                                                 
    return myData.baseURL + "/md5/" + this.md5;                      
  },                                                                 
  uploadStatus: function() {                                         
    var percent;                                                     
    percent = Session.get("" + this._id);                            
    if (percent == null) {                                           
      return "Processing...";                                        
    } else {                                                         
      return "Uploading...";                                         
    }                                                                
  },                                                                 
  formattedLength: function() {                                      
    return numeral(this.length).format('0.0b');                      
  },                                                                 
  uploadProgress: function() {                                       
    var percent;                                                     
    return percent = Session.get("" + this._id);                     
  },                                                                 
  isImage: function() {                                              
    var types;                                                       
    types = {                                                        
      'image/jpeg': true,                                            
      'image/png': true,                                             
      'image/gif': true,                                             
      'image/tiff': true                                             
    };                                                               
    return types[this.contentType] != null;                          
  },                                                                 
  loginToken: function() {                                           
    Meteor.userId();                                                 
    return Accounts._storedLoginToken();                             
  },                                                                 
  userId: function() {                                               
    return Meteor.userId();                                          
  }                                                                  
});        
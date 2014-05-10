define(['jquery', 'underscore', 'backbone',"model/company_content/companyContentModel",
'text!modules/content/contentViewTemplate.html'], 
function($, _, Backbone, CompanyContent, contentViewTemplate){ 
 
  var ContentView = Backbone.View.extend({ 
 
    //initialize template 
    template:_.template(contentViewTemplate), 
 
 	//customized events
 	
 	
    //render the content into div of view 
    render: function(){ 
	  //this.el is the root element of Backbone.View. By default, it is a div.    
      //$el is cached jQuery object for the view’s element. 
      //append the compiled template into view div container 
      this.$el.empty(); 
      
 	  var companyContent = this.collection.at(0);
      this.$el.append(this.template({"companyContent":companyContent})); 
      this.trigger("renderCompleted:CompanyContent", this);
      //return to enable chained calls 
      return this; 
    },
    
    
    contentComplete:function(e){
    	jQuery.mobile.loading('hide');
    },
    
    update:function(id){  
      var self = this;
      var tmpItem;
      jQuery.mobile.loading('show', {
		textVisible : true,
		html : ""
	  });
      this.bind('companyContentFetched:CompanyContent',this.render,this); 
      this.collection.fetch({
      	reset:true,
      	success:function(view, response){
      		jQuery.mobile.loading('hide');
      		self.collection.reset();
      		tmpItem = new CompanyContent(response.company_content.CompanyContent)
			self.collection.add(tmpItem);
			self.trigger("companyContentFetched:CompanyContent");
			
      	}
      }); 
    }, 
  }); 
  return ContentView; 
});
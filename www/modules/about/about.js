define(['jquery', 'underscore', 'backbone',"model/company/companyModel",
'text!modules/about/aboutViewTemplate.html'], 
function($, _, Backbone, Company, aboutViewTemplate){ 
 
  var AboutView = Backbone.View.extend({ 
 
    //initialize template 
    template:_.template(aboutViewTemplate), 
 
 	//customized events
 	//render the content into div of view 
    render: function(){ 
	  //this.el is the root element of Backbone.View. By default, it is a div.    
      //$el is cached jQuery object for the view’s element. 
      //append the compiled template into view div container 
      this.$el.empty(); 
      
 	  var company = this.collection.at(0);
      this.$el.append(this.template({"company":company})); 
      this.trigger("renderAboutCompleted:Company", this);
      //return to enable chained calls 
      return this; 
    },
    
    contentComplete:function(e){
    	jQuery.mobile.loading('hide');
    },
    
    update:function(company_id){  
      var self = this;
      jQuery.mobile.loading('show', {
		textVisible : true,
		html : ""
	  });
      this.bind('companyAboutDataFetched:Company',this.render,this); 
      this.collection.fetch({
      	reset:true,
      	success:function(view, response){
      		jQuery.mobile.loading('hide');
      		self.collection.reset();
      		var loadedCompany = response.company.Company;
      		tmpItem = new Company(response.company)
			self.collection.add(tmpItem);
			self.trigger("companyAboutDataFetched:Company");
			
      	}
      }); 
    }, 
 	
  }); 
  return AboutView; 
});
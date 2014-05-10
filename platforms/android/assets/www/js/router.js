var APP_ID = 1;
var BASE_URL = "http://invest2med.com";
var DEVICE_UUID = "";

define(['jquery', 'underscore', 'backbone', 'modules/home/home', 'modules/content/content','modules/about/about', "model/company/companyCollection", "model/company/companyModel","model/company_content/companyContentModel", 'jqm'], function($, _, Backbone, HomeView, ContentView,AboutView, CompanyCollection, Company, CompanyContent){
	'use strict';
	var Router = Backbone.Router.extend({
		routes:{
			'':'showHome',
			'home':'showHome',
			'viewcontent/:id':'viewContent',
			'about':'about',
			'*actions':'defaultAction'
		},
		
		
		defaultAction:function(actions){
			this.showHome(actions);
		},
		about:function(actions){
			//create a collection 
			var companyList = new Backbone.Collection({
				model:Company,
				
			});
			companyList.url = BASE_URL+"/api/companies/view/"+APP_ID;
            var view = new AboutView({collection:companyList});
			view.bind("renderAboutCompleted:Company", this.changePage, this);
			view.update(APP_ID);
		},
		viewContent:function(id){
			//create a collection 
			var companyContentList = new Backbone.Collection({
				model:CompanyContent,
				
			});
			companyContentList.url = BASE_URL+"/api/company_contents/view/"+id;
			var view = new ContentView({collection:companyContentList});
			
			view.bind("renderCompleted:CompanyContent", this.changePage, this);
			view.update(id);
			
		},
		showHome:function(actions){
			
			//create a collection 
			var companyList = new Backbone.Collection({
				model:Company,
				
			});
			companyList.url = BASE_URL+"/api/companies/view/"+APP_ID;
            var view = new HomeView({collection:companyList});
			view.bind("renderCompleted:Company", this.changePage, this);
			view.update(APP_ID);
		},
		showRegister:function(actions){
			var view = new RegisterView();
			view.render();
			this.changePage(view, "sign-up");
		},
		changePage:function (view, id) { 
        	//add the attribute ‘data-role=”page” ‘ for each view’s div 
        	if (typeof id == "undefined"){
        		view.$el.attr('data-role', 'page');   
        	}else{
        		view.$el.attr('data-role', 'page').attr("id", id);   
        	}
    		//append to dom 
        	$('body').append(view.$el);  
 			
            if(!this.init){   
                $.mobile.changePage($(view.el), {changeHash:false}); 
            }else{   
                this.init = false; 
            }            
    	}
	});
	return Router;
});

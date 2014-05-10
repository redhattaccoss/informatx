define(["backbone"], function(Backbone){ 
 
	var CompanyContent=Backbone.Model.extend({ 
    //default attributes 
		defaults:{ 
			id:"", 
			company_id:"", 
			title:"",
			type:"",
			date_published:"",
			content:""
		},
	}); 
	return CompanyContent; 
});
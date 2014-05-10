define(["backbone"], function(Backbone){ 
 
	var Company=Backbone.Model.extend({ 
    //default attributes 
		defaults:{ 
			id:"", 
			name:"", 
			address:"",
			website:"",
			city:"",
			country:"",
			description:"",
			email:"",
			number_of_employees:"",
			exchange:"",
			fax:"",
			founded:"",
			management:"",
			research_area:"",
			research_sector:"",
			strategy:"",
			summary_description:"",
			technology:"",
			products:"",
			symbol:"" 
		},
	}); 
	return Company; 
});
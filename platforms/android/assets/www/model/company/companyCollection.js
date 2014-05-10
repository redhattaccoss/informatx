define(['jquery', 'underscore', 'backbone','model/company/companyModel'], 
	function(jQuery, _, Backbone, Company){
		//create a collection 
        var Companies = new Backbone.Collection.extend({
			model:Company,
			
			fetchResult:function(company_id){
				var self = this;
			 	var tmpItem; 
			 	
			 	jQuery.get("/api/companies/view/"+company_id, function(response){
			 		data = jQuery.parseJSON(response);
			 		tmpItem = new Company(data.company.Company)
					self.add(tmpItem);
					self.trigger("companyDataFetched:Company"); 
			 	});
			}
		});
		return Companies;
	}
);

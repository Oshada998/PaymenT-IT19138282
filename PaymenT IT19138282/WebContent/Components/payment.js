$(document).ready(function()
{ 
if ($("#alertSuccess").text().trim() == "") 
 { 
 $("#alertSuccess").hide(); 
 } 
 $("#alertError").hide(); 
}); 
// SAVE ============================================
$(document).on("click", "#btnSave", function(event) 
{ 
// Clear alerts---------------------
 $("#alertSuccess").text(""); 
 $("#alertSuccess").hide(); 
 $("#alertError").text(""); 
 $("#alertError").hide(); 
// Form validation-------------------
var status = validatepaymentForm(); 
if (status != true) 
 { 
 $("#alertError").text(status); 
 $("#alertError").show(); 
 return; 
 } 
// If valid------------------------
var type = ($("#hidpaymentIDSave").val() == "") ? "POST" : "PUT"; 
$.ajax( 
{ 
		url : "paymentAPI", 
		type : type, 
		data : $("#formpayment").serialize(), 
		dataType : "text", 
		complete : function(response, status) 
		{ 
			onpaymnetSaveComplete(response.responseText, status); 
		} 
	}); 
});

function onpaymentSaveComplete(response, status)
{ 
if (status == "success") 
 { 
	 var resultSet = JSON.parse(response); 
	 if (resultSet.status.trim() == "success") 
	 { 
		 $("#alertSuccess").text("Successfully saved."); 
		 $("#alertSuccess").show();
		 
		 $("#divpaymentGrid").html(resultSet.data); 
	 } else if (resultSet.status.trim() == "error") 
	 { 
		 $("#alertError").text(resultSet.data); 
		 $("#alertError").show(); 
	 } 
 } else if (status == "error") 
 { 
	 $("#alertError").text("Error while saving."); 
	 $("#alertError").show(); 
 } else
 { 
	 $("#alertError").text("Unknown error while saving.."); 
	 $("#alertError").show(); 
 }

	$("#hidpaymentIDSave").val(""); 
	$("#formpayment")[0].reset(); 
}


// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
 $("#hidpaymentIDSave").val($(this).closest("tr").find('#hidpaymentIDUpdate').val()); 
 $("#amount").val($(this).closest("tr").find('td:eq(0)').text()); 
 $("#date").val($(this).closest("tr").find('td:eq(1)').text()); 
 $("#accountNo").val($(this).closest("tr").find('td:eq(2)').text()); 
 $("#paymentType").val($(this).closest("tr").find('td:eq(3)').text()); 
}); 

//REMOVE=======================================================

$(document).on("click", ".btnRemove", function(event)
{ 
	$.ajax( 
	{ 
		 url : "paymentAPI", 
		 type : "DELETE", 
		 data : "paymentID=" + $(this).data("paymentid"),
		 dataType : "text", 
		 complete : function(response, status) 
		 { 
			 onpaymentDeleteComplete(response.responseText, status); 
		 } 
	}); 
});

function onpaymentDeleteComplete(response, status)
{ 
	if (status == "success") 
	{ 
		var resultSet = JSON.parse(response); 
		if (resultSet.status.trim() == "success") 
		{ 
		 $("#alertSuccess").text("Successfully deleted."); 
		 $("#alertSuccess").show(); 
		 
		 $("#divpaymentGrid").html(resultSet.data); 
		} else if (resultSet.status.trim() == "error") 
		{ 
			 $("#alertError").text(resultSet.data); 
			 $("#alertError").show(); 
		} 
		
 } else if (status == "error") 
 { 
	 $("#alertError").text("Error while deleting."); 
	 $("#alertError").show(); 
 } else
 { 
	 $("#alertError").text("Unknown error while deleting.."); 
	 $("#alertError").show(); 
 } 

}

// CLIENT-MODEL================================================================
function validatepaymentForm() 
{ 
// AMOUNT
if ($("#amount").val().trim() == "") 
 { 
 return "Insert amount."; 
 } 
// DATE
if ($("#date").val().trim() == "") 
 { 
 return "Insert date."; 
 }

//ACCOUNT NUMBER-------------------------------
if ($("#accountNo").val().trim() == "") 
 { 
 return "Insert accountNo."; 
 } 
// is numerical value
var tmpPrice = $("#accountNo").val().trim(); 
if (!$.isNumeric(tmpPrice)) 
 { 
 return "Insert a numerical value for Item accountNo."; 
 } 
// convert to decimal price
 $("#accountNo").val(parseFloat(tmpPrice).toFixed(2)); 
// DESCRIPTION------------------------
if ($("#paymentType").val().trim() == "") 
 { 
 return "Insert payment Description."; 
 } 
return true; 
}
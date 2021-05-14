<%@page import="com.payment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>payment Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/items.js"></script>
</head>
<body> 
<div class="container"><div class="row"><div class="col-6"> 
<h1>payment Management V10.1</h1>
<form id="formpayment" name="formpayment">
 Item code: 
 <input id="amount" name="amount" type="text" 
 class="form-control form-control-sm">
 <br> Item name: 
 <input id="date" name="date" type="text" 
 class="form-control form-control-sm">
 <br> Item price: 
 <input id="accountNo" name="accountNo" type="text" 
 class="form-control form-control-sm">
 <br> Item description: 
 <input id="PaymentType" name="itemDesc" type="paymentType" 
 class="form-control form-control-sm">
 <br>
 <input id="btnSave" name="btnSave" type="button" value="Save" 
 class="btn btn-primary">
 <input type="hidden" id="hidpaymnetIDSave" 
 name="hidpaymentIDSave" value="">
</form>
<div id="alertSuccess" class="alert alert-success"></div>
<div id="alertError" class="alert alert-danger"></div>
<br>
<div id="divItemsGrid">
 <%
 	payment paymentObj = new payment(); 
  out.print(paymentObj.readpayment());
 %>
</div>
</div> </div> </div> 
</body>
</html>
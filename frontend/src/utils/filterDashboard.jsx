export function filterTransactions(
    transactions,
    search
){


if(!search)
return transactions;



const keyword =
search.toLowerCase();



return transactions.filter(
(item)=>{


return (

item.category
.toLowerCase()
.includes(keyword)

||

item.source_or_client
.toLowerCase()
.includes(keyword)

);


}

);


}
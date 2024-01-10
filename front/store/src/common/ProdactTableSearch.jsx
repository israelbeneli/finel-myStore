import ProdactLineInTable from "./ProdactLineInTable";

function ProdactTableInSearch({prodacts}){  
  
  return (
    <div className="container-xxl">
    <table className="table">
      <thead>
        <tr>
          <th>מק"ט</th>
          <th>שם המוצר</th>
          <th>דגם</th>
          <th>ספק</th>
          <th>מחיר</th>
          <th>כמות במלאי</th>
          <th>הנחה מקסימלית</th>
          <th> כמות בסל</th>
          <th> כמות להוספה</th>
        </tr>
      </thead>
  {(prodacts.length>0) && 
  <tbody>
      {prodacts.map((prodact) => (
        <ProdactLineInTable key={prodact.barcode} prodact={prodact} />
      ))}
    </tbody>}
    </table>
    </div>
  );
};
export default ProdactTableInSearch;
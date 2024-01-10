
const buttonData = [
    { label: 'הוספת לקוח חדש', url: '/customers/add' },
    { label: 'שינוי פרטים/מחיקה', url: '/customers/change' },
    { label: 'רשימת הזמנות ללקוח', url: '/customers/orders'}
  ];
export function Customer(){

    return(<>
    <div className="container mt-5">
      <div className="col-auto">
        {buttonData.map((button, index) => (
          <a
            key={index}
            href={button.url}
            className="btn btn-lg btn-primary mr-2 m-3 w-25"
            role="button"
          >
            {button.label}
          </a>
        ))}
      </div>
    </div>
    </>)
}

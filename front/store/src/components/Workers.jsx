
 function Workers(){

const buttonData = [
    { label: 'הוספת עובד חדש', url: '/workers/add' },
    { label: 'שינוי פרטים/מחיקה', url: '/workers/change' },
    { label: 'רשימת הזמנות לעובד', url: '/workers/orders' },
  ];
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
export default Workers;
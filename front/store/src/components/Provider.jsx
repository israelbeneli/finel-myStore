
function Providers(){

    const buttonData = [
        { label: 'הוספת ספק חדש', url: '/providers/add' },
        { label: 'שינוי פרטים/מחיקה', url: '/providers/change' },
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
    export default Providers;
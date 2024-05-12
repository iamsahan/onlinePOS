import emailjs from 'emailjs-com'

const Mailer=()=>{

    function sendEmail(e){
        e.preventDefault();

        emailjs.sendForm('service_43lh7kf','template_5htoh6o',e.target,'B6GaqU_Q9FkL8OtW2')
        .then(res=>{
            console.log(res);
        }).catch(err=>console.log(err));
    }


    return(
        <div className="container">
             <h1><u>Send Orders to Suppliers</u></h1>
            <div className="form-container">
            <div className="container my-4 p-4 rounded" style={{ backgroundColor: "#E3E5E7" }}>
                <form className='row'
                style={{margin:"25px 85px 75px 100px"}}
                onSubmit={sendEmail}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="user_email" className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" rows="5" className="form-control"></textarea>
                    </div>
                    <div className="form-group" style={{ marginTop: "20px" }}>
                        <button type="submit" className="btn btn-primary">Send</button>
                    </div>
                    
                </form>
                </div>
            </div>
        </div>
    );
}

export default Mailer;
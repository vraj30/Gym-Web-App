import React, {useState} from 'react'
import {toast} from 'react-toastify';

const BMICalc = () => {
    const[height, setHeight] = useState("");
    const[weight, setWeight] = useState("");
    const[gender, setGender] = useState("");
    const[bmi, setBMI] = useState("");

    const calcBMI = (e) => {
        e.preventDefault();

        if (!height || !weight || !gender) {
            toast.error("Please fill in all the required information!");
            return;
        }

        const heightInMeters = height / 100;
        const bmiVal = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        setBMI(bmiVal);

        if (bmiVal < 18.5) {
            toast.warning(
                "Your are Underweight! Consider seeking advice from our health & fitness expert" +
                "s."
            );
        } else if (bmiVal >= 18.5 && bmiVal < 24.9) {
            toast.success(
                "You have normal weight! Keep maintainning your healthy and fit lifestyle."
            );
        } else if (bmiVal >= 25 && bmiVal < 29.9) {
            toast.warning(
                "Your are Overweight! Consider seeking advice from our health & fitness experts" +
                "."
            );
        } else {
            toast.error("You are in Obese range! It is recommended to consult experts.");
        }

    };
    return (
        <section className="bmi">
            <h1>CALCULATE YOUR BMI</h1>
            <div className="container">
                <div className="wrapper">
                    <form onSubmit={calcBMI}>
                        <div>
                            <label>Height (CM)</label>
                            <input
                                type='number'
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                required="required"/>
                        </div>
                        <div>
                            <label>Weight (KG)</label>
                            <input
                                type='number'
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                required="required"/>
                        </div>
                        <div>
                            <label>Gender</label>
                            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                        </div>
                        <button type='submit'>Calculate BMI</button>
                    </form>
                </div>
                <div className="wrapper">
                  <img src='/bmi2.png' alt='bmiimage'/>
                </div>  
            </div>
        </section>
    )
}

export default BMICalc
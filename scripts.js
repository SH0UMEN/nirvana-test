(()=>{
    let inputs = document.querySelectorAll(".input"),
        values = [],
        resLabel = document.querySelector(".res");

    for(let i = 0; i < inputs.length; i++) {
        values.push(0);

        inputs[i].addEventListener("input", function () {
            let strval = this.value.replace(",", ".");
            let val = new Number(strval);

            // Проверка на вид числа
            if(isNaN(val)) {
                setError(this, "Введите число", i);
                return true;
            }

            // Проверка на длинну дробной части
            let valarr = strval.split(".");

            if(valarr[1] && valarr[1].length > 6) {
                setError(this, "Введите не более 6 символов после запятой", i);
                return true;
            }

            // Проверка на вход в заданный интервал
            if(val < 0 || val > 100000) {
                setError(this, "Введите число в интервале 0;100000", i);
                return true;
            }

            setError(this, "", i,false);

            values[i] = val;

            // Подсчёт
            if(values[0] && values[1]) {
                let result = values[0] - values[1];

                let resSplited = (result+"").split(".");

                if(resSplited[1] && resSplited[1].length > 6) {
                    result = result.toFixed(6);
                }

                resLabel.innerHTML = "Остаток: " + (result + "").replace(".", ",");
                resLabel.classList.add("shown");
            }
        })
    }

    // Вывод или скрытие ошибки
    function setError(input, message, index, mode=true) {
        let parent = input.parentNode;
        parent.querySelector(".error-message").innerHTML = message;

        if(mode) {
            parent.classList.add("error");
            resLabel.classList.remove("shown");
            values[index] = false
        } else {
            parent.classList.remove("error");
        }
    }
})();
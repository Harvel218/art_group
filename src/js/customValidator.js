class FormValidate {
  constructor(form, options = { classError: "error" }) {
    this.options = options;
    this.form = form;
    this.errorMsg = form.querySelector(".ErrorMsg");
  }

  getFields() {
    const inputs = [
      ...this.form.querySelectorAll(
        "input:not(:disabled):not([type='submit']), select:not(:disabled), textarea:not(:disabled)"
      ),
    ];
    const result = [];

    for (const el of inputs) {
      if (el.willValidate) {
        result.push(el);
      }
    }

    return result;
  }

  prepareElements() {
    const elements = this.getFields();

    for (const el of elements) {
      let eventName = "change";
      el.addEventListener(eventName, (e) => this.testInput(e.target));
    }
  }

  testInput(input) {
    const valid = input.checkValidity();
    this.markFieldAsError(input, !valid);
    return valid;
  }

  markFieldAsError(field, show) {
    if (show) {
      field.closest(".input-box").classList.add("error");
      field.closest(".input-box").classList.remove("valid");
    } else {
      field.closest(".input-box").classList.remove("error");
      field.closest(".input-box").classList.add("valid");
    }
  }

  bindSubmit() {
    this.form.querySelector(".submit").addEventListener("click", (e) => {
      e.preventDefault();
      // this.form.querySelector(".spinner").classList.remove("hidden");

      const elements = this.getFields();

      for (const el of elements) {
        this.markFieldAsError(el, !el.checkValidity());
      }
      // this.checkFormErrors()
      //     ? this.sendData(this.form)
      //     : this.form.querySelector(".spinner").classList.add("hidden");
    });
  }

  checkFormErrors() {
    const fields = this.getFields();
    const errors = [];
    for (const field of fields) {
      const error = field.closest(".form-error");
      errors.push(error);
    }

    if (errors.every((el) => el === null)) {
      return true;
    } else {
      return false;
    }
  }

  // sendData(form) {
  //     const url = "/process-form-data";
  //     const data = this.getEnteredData();
  //     data.resources = form.name;
  //     form.button.disabled = "disabled";
  //     fetch(url, {
  //         method: "post",
  //         headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json; charset=UTF-8",
  //         },
  //         body: JSON.stringify(data),
  //         credentials: "same-origin"
  //     }).catch(error => {
  //         console.log(error);
  //     });

  //     location.href = "/thank-you";
  // }

  getEnteredData() {
    const elements = this.getFields();

    const result = {};
    for (const el of elements) {
      result[el.name] = el.value;
    }
    return result;
  }

  init() {
    this.prepareElements();
    this.bindSubmit();
  }
}

function runValidator() {
  const willBeValidated = document.querySelectorAll(".custom-form");
  if (willBeValidated) {
    for (const formEl of willBeValidated) {
      const cfg = {};
      const form = new FormValidate(formEl, cfg);

      form.init();
    }
  }
}

runValidator();

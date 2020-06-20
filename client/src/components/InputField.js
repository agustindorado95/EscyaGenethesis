import React, { Fragment } from "react";

export const inputField = (formData, setFieldData, alerts, fieldName, placeholder, type, params = {}) => {
    return (
        <Fragment>
            <input
                className={
                    alerts.filter((alert) => alert.param === fieldName).length > 0
                        ? "form-control form-control-alternative is-invalid"
                        : "form-control form-control-alternative"
                }
                placeholder={placeholder}
                type={type}
                name={fieldName}
                value={formData[fieldName]}
                onChange={setFieldData}
                required={params.required ? true : false}
                minLength={params.minLength && params.minLength}
            />
            {alerts.filter((alert) => alert.param === fieldName).length > 0 && (
                <div className="invalid-feedback">
                    {alerts
                        .filter((alert) => alert.param === fieldName)
                        .map((err) => (
                            <span key={err.id}>{err.msg}</span>
                        ))}
                </div>
            )}
        </Fragment>
    );
};

export const selectField = (formData, setFieldData, alerts, fieldName, placeholder, params = []) => {
    return (
        <Fragment>
            <select
                className={
                    alerts.filter((alert) => alert.param === { fieldName }).length > 0
                        ? "form-control form-control-alternative is-invalid"
                        : "form-control form-control-alternative"
                }
                placeholder={placeholder}
                name={fieldName}
                value={formData[fieldName]}
                onChange={setFieldData}
            >
                {params.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.text}
                    </option>
                ))}
            </select>
            {alerts.filter((alert) => alert.param === fieldName).length > 0 && (
                <div className="invalid-feedback">
                    {alerts
                        .filter((alert) => alert.param === fieldName)
                        .map((err) => (
                            <span key={err.id}>{err.msg}</span>
                        ))}
                </div>
            )}
        </Fragment>
    );
};

export const textAreaField = (formData, setFieldData, alerts, fieldName, placeholder, params = {}) => {
    return (
        <Fragment>
            <textarea
                className={
                    alerts.filter((alert) => alert.param === fieldName).length > 0
                        ? "form-control form-control-alternative is-invalid"
                        : "form-control form-control-alternative"
                }
                placeholder={placeholder}
                name={fieldName}
                value={formData[fieldName]}
                onChange={setFieldData}
                required={params.required ? true : false}
            ></textarea>
            {alerts.filter((alert) => alert.param === fieldName).length > 0 && (
                <div className="invalid-feedback">
                    {alerts
                        .filter((alert) => alert.param === fieldName)
                        .map((err) => (
                            <span key={err.id}>{err.msg}</span>
                        ))}
                </div>
            )}
        </Fragment>
    );
};

import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
    if (alerts !== null && alerts.length > 0) {
        useEffect(() => {
            alerts.filter((alert)=>!alert.inForm).map((alert) => {
                const code = `$.notify(
                {
                    message: '${alert.msg}'
                },
                {
                    placement: {
                        from: "top",
                        align: "right",
                    },
                    type: '${alert.alertType}',
                    offset: {
                        x: 20,
                        y: 20,
                    },
                }
            )`;
                // Calling eval() on string function is inefficient,
                // but I currently don't see any workaround.
                // eslint-disable-next-line
                return new Function(code)();
            });
        }, []);
    }
    return null
};

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);

import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => {
        useEffect(()=>{
            const code =`$.notify(
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
            )`
            // Calling eval() on string function is inefficient, 
            // but I currently don't see any workaround.
            // eslint-disable-next-line
            new Function(code)();
        }, [])
        return ('')
    });

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);

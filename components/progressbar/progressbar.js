import { flexbox } from "@mui/system";

export default function progressBar(props) {

    const { bgcolor, completed } = props;

    const containerStyles = {
      height: 20,
      width: '96%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      display: flexbox,
      margin: '0 auto',
      marginTop: 4,
      marginBottom: 20
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }
    return (
        <div style={containerStyles}>
            <div style={fillerStyles}>
                <span style={labelStyles}>{`${completed}%`}</span>
        </div>
    </div>
    )
}
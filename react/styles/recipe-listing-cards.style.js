export const cardStyles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    tableRow: {
        whiteSpace: 'normal',
        wordWrap: 'break-word'
    },
    gridList: {
        width: 500,
        height: 450,
        overflowY: 'auto',
    },
    cards: {
        marginTop: "100px"
    },
    card: {
        overflow: "hidden",
        borderRadius: "5px",
        margin: "auto",
        marginTop: "8%"
    },
    cardMedia: {
        height: "180px",
        //maxHeight: "200px"
    },
    cardTitle: {
        zIndex: "0",
        height: "85px",
        textAlign: "left",
        backgroundColor: "#04B4AE"
    },
    cardText: {
        zIndex: "-1",
        textAlign: "left",
        height: "80px"
    },
    actionButton: {
        zIndex: "1",
        position: "absolute",
        bottom: "55px",
        right: "35px"
    },
    cardDetailText: {
        zIndex: "-1",
        textAlign: "center",
        marginTop: "20px"
    },
    actionDetailButton: {
        zIndex: "1",
        position: "absolute",
        bottom: "165px",
        right: "35px"
    },
    row: {
        marginBottom: "20px"
    },
    col: {
        title: {
            fontSize: "13px",
            color: "grey"
        },
        half: {
            float: "left",
            width: "50%",
            bordered: {
                float: "left",
                width: "50%",
                borderRight: "1px solid grey"
            }
        },
        third: {
            float: "left",
            width: "33.3%",
            bordered: {
                float: "left",
                width: "33.3%",
                borderRight: "1px solid grey"
            }
        }
    },
    linkToDetail: {
        display: "block",
        color: "#04B4AE",
        textAlign: "center"
    },
    titleStyle: {
        fontSize: "medium"
    },
    subtitleStyle: {
        fontSize: "small"
    },
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    }
};
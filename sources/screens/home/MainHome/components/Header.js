import React, { useState } from "react"
import { StyleSheet, useWindowDimensions } from "react-native"

/* components */
import { Container, Button, Text } from "../../../../components"

/* implements */
import { colors } from "../../../../themes/colors"

/* packages */
import Feather from "react-native-vector-icons/Feather"

const Header = ({ text = "", isNews = false, onPress = () => { }, onOpen = () => { } }) => {
    /* configure screen */
    const { width } = useWindowDimensions();

    /* create state */
    const [note, setNote] = useState("");
    const [label, setLabel] = useState("");
    const [selected, setSelected] = useState(null);

    const handleSelected = (number = 0) => {
        switch (number) {
            case 1: 
                setSelected(number);
                setLabel("Your current location");
                setNote("Ward 5, Go Vap District, Ho Chi Minh City");
                setTimeout(() => {
                    setSelected(null);
                }, 4000);
                break;
            case 2: 
            setSelected(number);
            setLabel("Distance")
            setNote("800 meter");
            setTimeout(() => {
                setSelected(null);
            }, 4000);
            break;
            case 3: 
                setSelected(number);
                setLabel("The closest store")
                setNote("325 Nguyen Oanh street, ward 7, Go Vap District, Ho Chi Minh City");
                setTimeout(() => {
                    setSelected(null);
                }, 4000);
                break;
            default: break;
        }
    }

    return (
        <Container width={"100%"} jCenter aCenter mb={16}>
            <Text style={{ fontFamily: "yeseva_one_regular" }} size={32} color={colors.PRIMARY} bold>Superior</Text>
            <Container width={"100%"} row aCenter between mv={12}>
                <Button onPress={onOpen}
                    width={48} height={48} r={6} jCenter aCenter shadow bgColor={colors.WHITE}>
                    {
                        isNews && (
                            <Container width={10} height={10} r={5} absolute right={4} top={4} bgColor={colors.TOMATO} />
                        )
                    }
                    <Feather style={{ transform: [{ rotate: "90deg" }] }} name={"sliders"} size={24} color={colors.PRIMARY} />
                </Button>

                <Button onPress={onPress}
                    width={"82%"} height={48} shadow row r={6} p={12} jCenter aCenter bgColor={colors.WHITE}>
                    <Text width={"85%"} color={colors.GREY} size={16}>{text}</Text>
                    <Container width={"15%"} aEnd>
                        <Feather name={"search"} size={24} color={colors.PRIMARY} />
                    </Container>
                </Button>
            </Container>

            {
                selected === 1 ? (
                    <Container aStart width={"100%"} absolute bottom={48}>
                        <Container width={"100%"} p={12} r={8} bgColor={colors.PRIMARY_OPACITY_60}>
                            <Text caption color={colors.YELLOW} mb={4}>{label}</Text>
                            <Text paragraph color={colors.WHITE} numberOfLines={2}>{note}</Text>
                        </Container>
                        <Container width={12} height={12} r={6} mv={8} bgColor={colors.PRIMARY_OPACITY_60}/>
                    </Container>
                ) : selected === 2 ? (
                    <Container aCenter absolute bottom={48}>
                        <Container width={"100%"} p={12} r={8} bgColor={colors.PRIMARY_OPACITY_60}>
                            <Text caption color={colors.YELLOW} mb={4}>{label}</Text>
                            <Text paragraph color={colors.WHITE} numberOfLines={2}>{note}</Text>
                        </Container>
                        <Container width={12} height={12} r={6} mv={8} bgColor={colors.PRIMARY_OPACITY_60}/>
                    </Container>
                ) : selected === 3 && (
                    <Container aEnd width={"100%"} absolute bottom={48}>
                        <Container width={"100%"} p={12} r={8} bgColor={colors.PRIMARY_OPACITY_60}>
                            <Text caption color={colors.YELLOW} mb={4}>{label}</Text>
                            <Text paragraph color={colors.WHITE} numberOfLines={2}>{note}</Text>
                        </Container>
                        <Container width={12} height={12} r={6} mv={8} bgColor={colors.PRIMARY_OPACITY_60}/>
                    </Container>
                )
            }

            <Container row width={"100%"} between>
                <Button onPress={() => handleSelected(1)}
                    row width={(width - 56) / 3} height={48} r={6} p={8} shadow between aCenter bgColor={colors.WHITE}>
                    <Feather style={{ width: "20%" }} name="map-pin" size={16} color={colors.PRIMARY} />
                    <Text width={"80%"} color={colors.BLACK} center>Hồ Chí Minh</Text>
                </Button>
                <Button onPress={() => handleSelected(2)}
                    row width={(width - 56) / 3} height={48} r={6} p={8} shadow between aCenter bgColor={colors.WHITE}>
                    <Feather style={{ width: "20%" }} name="navigation" size={16} color={colors.PRIMARY} />
                    <Text width={"80%"} color={colors.BLACK} center>7 km</Text>
                </Button>
                <Button onPress={() => handleSelected(3)}
                    row width={(width - 56) / 3} height={48} r={6} p={8} shadow between aCenter bgColor={colors.WHITE}>
                    <Feather style={{ width: "20%" }} name="map" size={16} color={colors.PRIMARY} />
                    <Text width={"80%"} color={colors.BLACK} center>CN 1</Text>
                </Button>
            </Container>
        </Container>
    )
}

export default Header

const styles = StyleSheet.create({})
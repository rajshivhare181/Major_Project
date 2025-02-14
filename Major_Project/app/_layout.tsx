import 'react-native-gesture-handler';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome6, FontAwesome5, Entypo, Fontisto } from '@expo/vector-icons';
import Index from './';
import register from './register';
import login from './login';
import profile from './profile';
import setting from './setting';
import about from './about';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import Gwalior_Fort from './Gwalior_Fort';
import Adalaj_Stepwell from './Adalaj_Stepwell';
import Agartala from './Agartala';
import Agatti_Island from './Agatti_Island';
import Agra_Fort from './Agra_Fort';
import Aguada_Fort from './Aguada_Fort';
import Aizawl from './Aizawl';
import Ajanta_Caves from './Ajanta_Caves';
import Akshardham_Temple from './Akshardham_Temple';
import Alappuzha_Beach from './Alappuzha_Beach';
import Almora from './Almora';
import Amarnath_Cave_Temple from './Amarnath_Cave_Temple';
import Ambedkar_Memorial_Park from './Ambedkar_Memorial_Park';
import Amber_Palace from './Amber_Palace';
import Ambience_Mall_And_Valley_Park from './Ambience_Mall_And_Valley_Park';
import Amini_Island from './Amini_Island';
import Amravati from './Amravati';
import Anandpur_Sahib from './Anandpur_Sahib';
import Andrott_Island from './Andrott_Island';
import Anthurium_Waterfall from './Anthurium_Waterfall';
import Araku_Valley from './Araku_Valley';
import Aravali_Biodiversity_Park from './Aravali_Biodiversity_Park';
import Archaeological_Park from './Archaeological_Park';
import Arikamedu from './Arikamedu';
import Ashoka_Pillar from './Ashoka_Pillar';
import Aurobindo_ashrm from './Aurobindo_ashrm';
import Auroville from './Auroville';
import Baba_Baidyanath_Mandir from './Baba_Baidyanath_Mandir';
import Baga_Beach from './Baga_Beach';
import Bamleshwari_Temple from './Bamleshwari_Temple';
import Bandhavgarh_National_Park from './Bandhavgarh_National_Park';
import Bangalore_Fort from './Bangalore_Fort';
import Bangaram_Island from './Bangaram_Island';
import Banjhakri_Falls from './Banjhakri_Falls';
import Bannerghatta_Biological_Park from './Bannerghatta_Biological_Park';
import BAPS_Akshardham_Temple from './BAPS_Akshardham_Temple';
import Baratang_Island from './Baratang_Island';
import Barnawapara_Wildlife_Sanctuary from './Barnawapara_Wildlife_Sanctuary';
import Barren_Island from './Barren_Island';
import Basilica_of_Bom_Jesus from './Basilica_of_Bom_Jesus';
import Basilica_of_Jesus from './Basilica_of_Jesus';
import Basistha_Ashram from './Basistha_Ashram';
import Basset_Hills from './Basset_Hills';
import Bastar_Palace from './Bastar_Palace';
import Bengaluru from './Bengaluru';
import Bodh_Gaya from './Bodh_Gaya';
import Bogamati from './Bogamati';
import Bollywood_Tour from './Bollywood_Tour';
import Bomdila from './Bomdila';
import Borra_Caves from './Borra_Caves';
import Botanical_Garden from './Botanical_Garden';
import Brahma_Sarovar from './Brahma_Sarovar';
import Buddha_Smriti_Park from './Buddha_Smriti_Park';
import Buddha_Jayanti_Park from './Buddha_Jayanti_Park';
import Buddha_Park from './Buddha_Park';
import Calangute_Beach from './Calangute_Beach';
import Cellular_Jail from './Cellular_Jail';
import Chadar_Trek from './Chadar_Trek';
import Chamarajendra_Park from './Chamarajendra_Park';
import Champhai from './Champhai';
import Chapora_Fort from './Chapora_Fort';
import Charminar from './Charminar';
import Chatham_Saw_Mill from './Chatham_Saw_Mill';
import Chetlat_Island from './Chetlat_Island';
import Chidambaram_Nataraja_Temple from './Chidambaram_Nataraja_Temple';
import Chidiya_Tapu from './Chidiya_Tapu';
import Chitrakoot from './Chitrakoot';
import Chitrakote_Falls from './Chitrakote_Falls';
import Chittorgarh_Fort from './Chittorgarh_Fort';
import Chopta_Valley from './Chopta_Valley';
import Chowmahalla_Palace from './Chowmahalla_Palace';
import Chunnambar_Boat_House from './Chunnambar_Boat_House';
import City_Palace from './City_Palace';
import Corbyns_Cove_Beach from './Corbyns_Cove_Beach';
import Cuttack_Museum from './Cuttack_Museum';
import Dachigam_National_Park from './Dachigam_National_Park';
import Dainthlen_Waterfall from './Dainthlen_Waterfall';
import Dakshineswar_Kali_Temple from './Dakshineswar_Kali_Temple';
import Dal_Lake from './Dal_Lake';
import Dalhousie from './Dalhousie';
import Daman_Ganga_River from './Daman_Ganga_River';
import Dame_des_Anges from './Dame_des_Anges';
import Dampui_Hill from './Dampui_Hill';
import Darjeeling from './Darjeeling';
import Dashashwamedh_Ghat from './Dashashwamedh_Ghat';
import Dassam_Falls from './Dassam_Falls';
import Dawki from './Dawki';
import Dehradun from './Dehradun';
import Dharamshala from './Dharamshala';
import Dhauli_Hill from './Dhauli_Hill';
import Dibrugarh from './Dibrugarh';
import Dilwara_Temples from './Dilwara_Temples';
import Dimna_Lake from './Dimna_Lake';
import Dirang_Valley from './Dirang_Valley';
import Diskit_Monastery from './Diskit_Monastery';
import Dudhsagar_Falls from './Dudhsagar_Falls';
import Durtlang_Hills from './Durtlang_Hills';
import Dzukou_Valley from './Dzukou_Valley';
import Elephant_Beach from './Elephant_Beach';
import Ellora_Caves from './Ellora_Caves';
import Enchey_Monastery from './Enchey_Monastery';
import Eravikulam_National_Park from './Eravikulam_National_Park';
import Falkawn_Village from './Falkawn_Village';
import Fatehgarh_Sahib from './Fatehgarh_Sahib';
import Folklore_Museum from './Folklore_Museum';
import Fort_Kochi from './Fort_Kochi';
import Fourteen_Gods_Temple from './Fourteen_Gods_Temple';
import French_Quarter from './French_Quarter';
import Gandhi_Memorial_Museum from './Gandhi_Memorial_Museum';
import Gir_National_Park from './Gir_National_Park';
import Golconda_Fort from './Golconda_Fort';
import Golden_Temple from './Golden_Temple';
import Golghar from './Golghar';
import Govindajee_Temple from './Govindajee_Temple';
import Gulmarg from './Gulmarg';
import Gurudongmar_Lake from './Gurudongmar_Lake';
import Gurudwara_10th_Paatshahi from './Gurudwara_10th_Paatshahi';
import Gurudwara_Panja_Sahib from './Gurudwara_Panja_Sahib';
import Gurudwara_Shri_Bangla  from './Gurudwara_Shri_Bangla';
import Gurugram_Gurudwara from './Gurugram_Gurudwara';
import Guwahati from './Guwahati';
import Hadimba_Temple from './Hadimba_Temple';
import Haflong from './Haflong';
import Hamis_Gompa from './Hamis_Gompa';
import Hanuman_Mandir from './Hanuman_Mandir';
import Hanuman_Temple_Jakhu from './Hanuman_Temple_Jakhu';
import Hanuman_Tok from './Hanuman_Tok';
import Har_Ki_Pauri from './Har_Ki_Pauri';
import Haridwar from './Haridwar';
import Havelock_Island from './Havelock_Island';
import Hawa_Mahal from './Hawa_Mahal';
import Hayagriva_Madhava_Temple from './Hayagriva_Madhava_Temple';
import Hazratbal_Shrine from './Hazratbal_Shrine';
import Hemis_National_Park from './Hemis_National_Park';
import Hill_Stations_of_Nilgiris from './Hill_Stations_of_Nilgiris';
import Himalayan_Zoological_Park from './Himalayan_Zoological_Park';
import Himayvan_Kauncha from './Himayvan_Kauncha';
import Hirwavan_Garden from './Hirwavan_Garden';
import Hmuifang from './Hmuifang';
import Howrah_Bridge from './Howrah_Bridge';
import Humayuns_Tomb from './Humayuns_Tomb';
import Hundru_Falls from './Hundru_Falls';
import Hyderabad from './Hyderabad';
import Immaculate_Conception_Church from './Immaculate_Conception_Church';
import India_Gate from './India_Gate';
import Indigenous_Tribes from './Indigenous_Tribes';
import INS_Kurusura_Submarine_Museum from './INS_Kurusura_Submarine_Museum';
import International_Shopping_Mall from './International_Shopping_Mall';
import ISKCON_Temple_Bangalore from './ISKCON_Temple_Bangalore';
import ISKCON_Temple from './ISKCON_Temple';
import Itanagar from './Itanagar';
import Jag_Mandir from './Jag_Mandir';
import Jagannath_Mandir from './Jagannath_Mandir';
import Jagannath_Temple_Puri from './Jagannath_Temple_Puri';
import Jagdish_Temple from './Jagdish_Temple';
import Jainath_Temple from './Jainath_Temple';
import Jal_Mahal from './Jal_Mahal';
import Jaldapara_National_Park from './Jaldapara_National_Park';
import Jallianwala_Bagh from './Jallianwala_Bagh';
import Jama_Masjid from './Jama_Masjid';
import Jampui_Hills from './Jampui_Hills';
import Jantar_Mantar_Jaipur from './Jantar_Mantar_Jaipur';
import Jantar_Mantar from './Jantar_Mantar';
import Japfu_Peak from './Japfu_Peak';
import Jhansi_Fort from './Jhansi_Fort';
import Jim_Corbett_Park from './Jim_Corbett_Park';
import Jonha_Falls from './Jonha_Falls';
import Kachari_Ruins from './Kachari_Ruins';
import Kadmat_Island from './Kadmat_Island';
import Kailasanathar_Temple from './Kailasanathar_Temple';
import Kala_Pathar_Beach from './Kala_Pathar_Beach';
import Kalapeni_Island from './Kalapeni_Island';
import Kalimpong from './Kalimpong';
import Kanchenjunga_Falls from './Kanchenjunga_Falls';
import Kanger_Valley_National_Park from './Kanger_Valley_National_Park';
import Kangla_Fort from './Kangla_Fort';
import Kanke_Dam from './Kanke_Dam';
import Kanha_National_Park from './Kanha_National_Park';
import Kapaleeshwarar_Temple from './Kapaleeshwarar_Temple';
import Karimganj from './Karimganj';
import Kasauli from './Kasauli';
import Kashi_Vishwanath_Temple from './Kashi_Vishwanath_Temple';
import Kasol from './Kasol';
import Kavaratti_Island from './Kavaratti_Island';
import Kaziranga_National_Park from './Kaziranga_National_Park';
import Keibul_Lamjao_National_Park from './Keibul_Lamjao_National_Park';
import Keshgarh_Sahib from './Keshgarh_Sahib';
import Khajuraho_Temples from './Khajuraho_Temples';
import Khandagiri_Caves from './Khandagiri_Caves';
import Khardung_La from './Khardung_La';
import Kisama from './Kisama';
import Kolkata from './Kolkata';
import Konark_Sun_Temple from './Konark_Sun_Temple';
import Kovalam_Beach from './Kovalam_Beach';
import Kovalam from './Kovalam';
import Kumbakonam from './Kumbakonam';
import Kumbhalgarh_Fort from './Kumbhalgarh_Fort';
import Kupwara from './Kupwara';
import Lachung from './Lachung';
import Lady_Of_Piety_Church from './Lady_Of_Piety_Church';
import Laitlum_Canyons from './Laitlum_Canyons';
import Lakshadweep from './Lakshadweep';
import Lalbagh_Botanical_Garden from './Lalbagh_Botanical_Garden';
import Lamayuru_Monastery from './Lamayuru_Monastery';
import Le_Corbusier_Centre from './Le_Corbusier_Centre';
import Leh_Ladakh from './Leh_Ladakh';
import Leh_Palace from './Leh_Palace';
import Leisure_Valley_Park from './Leisure_Valley_Park';
import Leisure_Valley from './Leisure_Valley';
import Lepakshi from './Lepakshi';
import Lingaraj_Temple from './Lingaraj_Temple';
import Living_Root_Bridges from './Living_Root_Bridges';
import Lodhi_Garden from './Lodhi_Garden';
import Loktak_Lake from './Loktak_Lake';
import Lonavala from './Lonavala';
import Lotus_Temple from './Lotus_Temple';
import Magnetic_Hill from './Magnetic_Hill';
import Mahabaleshwar from './Mahabaleshwar';
import Mahabodhi_Temple from './Mahabodhi_Temple';
import Mahamaya_Temple from './Mahamaya_Temple';
import Mahanadi_River from './Mahanadi_River';
import Mahasamundra from './Mahasamundra';
import Manakula_Vinayagar_Temple from './Manakula_Vinayagar_Temple';
import Manali from './Manali';
import Mandu from './Mandu';
import Mantralayam from './Mantralayam';
import Marina_Beach from './Marina_Beach';
import Marine_National_Park from './Marine_National_Park';
import Marudamalai_Temple from './Marudamalai_Temple';
import Mathura from './Mathura';
import Meadow_of_Gold from './Meadow_of_Gold';
import Mechuka_Valley from './Mechuka_Valley';
import Meenakshi_Amman_Temple from './Meenakshi_Amman_Temple';
import Mehrangarh_Fort from './Mehrangarh_Fort';
import Minicoy_Island from './Minicoy_Island';
import Moirang from './Moirang';
import Mokokchung_Fort from './Mokokchung_Fort';
import Monuments_at_Hampi from './Monuments_at_Hampi';
import Moriri_National_Park from './Moriri_National_Park';
import Morni_Hills from './Morni_Hills';
import Mount_Harriest_National_Park from './Mount_Harriest_National_Park';
import Mukteshwar_Temple from './Mukteshwar_Temple';
import Mussoorie from './Mussoorie';
import Mysore_Palace from './Mysore_Palace';
import Mysuru_Zoo from './Mysuru_Zoo';
import Nagarahole_Tiger_Reserve from './Nagarahole_Tiger_Reserve';
import Nainital from './Nainital';
import Nakshatra_Garden from './Nakshatra_Garden';
import Nalanda from './Nalanda';
import Namdapha_National_Park from './Namdapha_National_Park';
import Nandan_Van_Zoo from './Nandan_Van_Zoo';
import Nandankanan_Zoological_Park from './Nandankanan_Zoological_Park';
import Nataraja_Temple from './Nataraja_Temple';
import National_Museum from './National_Museum';
import Neertal_Complex_Dudhani from './Neertal_Complex_Dudhani';
import Nehru_Zoological_Park from './Nehru_Zoological_Park';
import Neil_Island from './Neil_Island';
import Nellaiappar_Temple from './Nellaiappar_Temple';
import Ngengpui_Wildlife_Sanctuary from './Ngengpui_Wildlife_Sanctuary';
import Nohkalikai_Falls from './Nohkalikai_Falls';
import North_Bay_Island from './North_Bay_Island';
import Nubra_Valley from './Nubra_Valley';
import Orchha_Fort from './Orchha_Fort';
import Orchidarium from './Orchidarium';
import Pachmarhi from './Pachmarhi';
import Padmanabhaswamy_Temple from './Padmanabhaswamy_Temple';
import Pahalgam from './Pahalgam';
import Pahari_Temple_Ranchi from './Pahari_Temple_Ranchi';
import Palolem_Beach from './Palolem_Beach';
import Pangong_Tso from './Pangong_Tso';
import Paradise_Beach from './Paradise_Beach';
import Pasighat from './Pasighat';
import Patna_Museum from './Patna_Museum';
import Patnitop from './Patnitop';
import Patratu_Valley from './Patratu_Valley';
import Pelling from './Pelling';
import Periyar_National_Park from './Periyar_National_Park';
import Phawngpui from './Phawngpui';
import Pondicherry_Museum from './Pondicherry_Museum';
import Prayagraj from './Prayagraj';
import Promenade_Beach from './Promenade_Beach';
import Pulwama from './Pulwama';
import Pune from './Pune';
import Punjab_Agricultural_University from './Punjab_Agricultural_University';
import Puri from './Puri';
import Qila_Mubarak from './Qila_Mubarak';
import Qutub_Minar from './Qutub_Minar';
import Radhanagar_Beach from './Radhanagar_Beach';
import Raghavendra_Swamy_Temple from './Raghavendra_Swamy_Temple';
import Rameswaram from './Rameswaram';
import Ramoji_Film_City from './Ramoji_Film_City';
import Ranchi_Hill from './Ranchi_Hill';
import Rani_ki_Vav from './Rani_ki_Vav';
import Ranthambore_National_Park from './Ranthambore_National_Park';
import Ravangla_Monastery from './Ravangla_Monastery';
import Red_Fort from './Red_Fort';
import Red_Hill from './Red_Hill';
import Reiek_Tlang from './Reiek_Tlang';
import Rimbi_Waterfall from './Rimbi_Waterfall';
import Rishikesh from './Rishikesh';
import Rock_Garden from './Rock_Garden';
import Roing from './Roing';
import Ronglien_Waterfall from './Ronglien_Waterfall';
import Ross_and_Smith_Islands from './Ross_and_Smith_Islands';
import Rudrasagar_Lake from './Rudrasagar_Lake';
import Rumtek_Monastery from './Rumtek_Monastery';
import Sabarmati_Ashram from './Sabarmati_Ashram';
import Sai_Ka_Angan_Temple from './Sai_Ka_Angan_Temple';
import Salar_Jung_Museum from './Salar_Jung_Museum';
import Samudrika_Marine_Museum from './Samudrika_Marine_Museum';
import Sanchi_Stupa from './Sanchi_Stupa';
import Sangai_Wildlife from './Sangai_Wildlife';
import Sanjay_Gandhi_Biological_Park from './Sanjay_Gandhi_Biological_Park';
import Sarodhadadar_Village from './Sarodhadadar_Village';
import Satmalia_Deer_Sanctuary from './Satmalia_Deer_Sanctuary';
import Science_City from './Science_City';
import Scuba_Diving from './Scuba_Diving';
import Se_Cathedral from './Se_Cathedral';
import Sector_17_Market from './Sector_17_Market';
import Sela_Pass from './Sela_Pass';
import Sentinalese_Tribe from './Sentinalese_Tribe';
import Seven_Sisters_Waterfall from './Seven_Sisters_Waterfall';
import Shakti_Peeth_Temple from './Shakti_Peeth_Temple';
import Shanti_Stupa from './Shanti_Stupa';
import Sheesh_Mahal from './Sheesh_Mahal';
import Sheetla_Mata_Mandir from './Sheetla_Mata_Mandir';
import Shey_Palace from './Shey_Palace';
import Shilloi_Lake from './Shilloi_Lake';
import Shimla from './Shimla';
import Shirdi_Sai_Mandir from './Shirdi_Sai_Mandir';
import Shnongpdeng from './Shnongpdeng';
import Shree_Dwarkadhish_Temple from './Shree_Dwarkadhish_Temple';
import Shree_Mangueshi_Temple from './Shree_Mangueshi_Temple';
import Shri_Kedarnath_Jyotirlinga_Temple from './Shri_Kedarnath_Jyotirlinga_Temple';
import Shri_Pathar_Sahib from './Shri_Pathar_Sahib';
import Siddhivinayak_Temple from './Siddhivinayak_Temple';
import Sohra from './Sohra';
import Somnath_Temple from './Somnath_Temple';
import Sonamarg from './Sonamarg';
import Spice_Gardens from './Spice_Gardens';
import Spiti_Valley from './Spiti_Valley';
import Spituk_Monastery from './Spituk_Monastery';
import Sri_Aurobindo_Ashram from './Sri_Aurobindo_Ashram';
import Srinagar from './Srinagar';
import State_Museum from './State_Museum';
import Statue_of_Unity from './Statue_of_Unity';
import Stok_Kangri from './Stok_Kangri';
import Sualkuchi from './Sualkuchi';
import Suheli_Par from './Suheli_Par';
import Sukhna_Lake from './Sukhna_Lake';
import Sultanpur_National_Park from './Sultanpur_National_Park';
import Sweet_Falls from './Sweet_Falls';
import Tagore_Hill from './Tagore_Hill';
import Taj_Falaknuma_Palace from './Taj_Falaknuma_Palace';
import Taj_Mahal from './Taj_Mahal';
import Takht_Sri_Harmandir_Sahib_Ji from './Takht_Sri_Harmandir_Sahib_Ji';
import Tam_Dil from './Tam_Dil';
import Tashi_View_Point from './Tashi_View_Point';
import Tashiding_Monastery from './Tashiding_Monastery';
import Tawang_Monastery from './Tawang_Monastery';
import Tezu from './Tezu';
import Tharon_Cave from './Tharon_Cave';
import The_Silva_Store from './The_Silva_Store';
import Thekkady from './Thekkady';
import Thiksey_Monastery from './Thiksey_Monastery';
import Thiruvalluvar_Statue from './Thiruvalluvar_Statue';
import Thotlakonda_Buddhist_Monastery from './Thotlakonda_Buddhist_Monastery';
import Tiger_Reserve from './Tiger_Reserve';
import Tirathgarh_Waterfall from './Tirathgarh_Waterfall';
import Tirthan_Valley from './Tirthan_Valley';
import Tirupati from './Tirupati';
import Tribal_Museum_Silvassa from './Tribal_Museum_Silvassa';
import Trimbakeshwar_Temple from './Trimbakeshwar_Temple';
import Tripura_State_Museum from './Tripura_State_Museum';
import Trishna_Wild_Life_Sanctuary from './Trishna_Wild_Life_Sanctuary';
import Tropical_Climate from './Tropical_Climate';
import Tso_Moriri from './Tso_Moriri';
import Tsomgo_Lake from './Tsomgo_Lake';
import Tuophema from './Tuophema';
import Tungnath_Temple from './Tungnath_Temple';
import UB_City from './UB_City';
import Ujjain_Temple from './Ujjain_Temple';
import Ujjayanta_Palace from './Ujjayanta_Palace';
import Ukhrul from './Ukhrul';
import Umiam_Lake from './Umiam_Lake';
import Unakoti_Rock_Carvings from './Unakoti_Rock_Carvings';
import Vaishno_Devi_Temple from './Vaishno_Devi_Temple';
import Valley_Of_Flowers_National_Park from './Valley_Of_Flowers_National_Park';
import Valley_of_Gods from './Valley_of_Gods';
import Valluvar_Kottam from './Valluvar_Kottam';
import Vantawng_Falls from './Vantawng_Falls';
import Varanasi from './Varanasi';
import Vasona_Lion_Safari from './Vasona_Lion_Safari';
import Vellore_Fort from './Vellore_Fort';
import Victoria_Memorial from './Victoria_Memorial';
import Vikramshila from './Vikramshila';
import Vila_Palace from './Vila_Palace';
import Viper_Island from './Viper_Island';
import Virupaksha_Temple from './Virupaksha_Temple';
import Visakhapatnam from './Visakhapatnam';
import Vivekananda_Rock from './Vivekananda_Rock';
import Vrindavan from './Vrindavan';
import Wagah_Border from './Wagah_Border';
import Wayanad from './Wayanad';
import Wokha_Dam from './Wokha_Dam';
import Yadavindra_Gardens from './Yadavindra_Gardens';
import Yumthang_Valley from './Yumthang_Valley';
import Zakir_Hussain_Rose_Garden from './Vila_Palace';
import Ziro_Valley from './Ziro_Valley';
import Zoological_Park from './Zoological_Park';
import { ref, getDownloadURL, getStorage } from 'firebase/storage';
import { doc, getDoc, } from "firebase/firestore";
import { db } from '../firebase';

const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get("window");

export default function Layout() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const reload = async () => {
      const getUser = await AsyncStorage.getItem('user');
      setUser(getUser ? JSON.parse(getUser) : null);
      // console.log("user2", user);
    };
    reload();
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      setUser(currentUser);
    });
    if (auth.currentUser) {
      const fetchUser = async () => {
        const userId = auth.currentUser?.uid;
        if (userId) {
          try {
            const userDoc = await getDoc(doc(db, "users", userId));
            const data = userDoc.data();
            setUserData(data || {});
            // console.log("userdata:", userData);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        } else {
          console.warn("No user found for fetchUser");
        }
      };

      const fetchImage = async () => {
        const userId = auth.currentUser?.uid;
        if (userData.profileImage){
          try {
            const storage = getStorage();
            const imageRef = ref(storage, `profileImages/${userId}`); // Path in Storage
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
          } catch (error) {
            console.error("Error fetching image:", error);
          }
          // console.log(userData?.profileImage);
        }
        // console.log("fetchImage was in execution");
        // console.log(userData.profileImage);
        // console.log(userId)
      };

      fetchUser();
      fetchImage();
      // console.log("user", user);
    }
    return unsubscribe;
  }, []);

  return (
    <>
      {user ? 
        (<Drawer.Navigator
          drawerContent={(props) => {
            return (
              <SafeAreaView style={{paddingVertical: height * 0.02}}>
                <View style={{
                  height: 200,
                  width: "95%",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                  {imageUrl ? (
                    <Image
                      source={{ uri: imageUrl }}
                      style={{ width: 200, height: 200, borderRadius: 100 }}
                    />
                  ) : (
                    <Image source={require('@/assets/images/user.png')} 
                      style={{
                      height: 200,
                      width: 200,
                    }} 
                  />
                  )}
                </View>
                <DrawerItemList {...props} />
                {/* <TouchableOpacity style={styles.btn} onPress={handleLogout}>
                  <Text style={styles.text}>Log out</Text>
                </TouchableOpacity> */}
              </SafeAreaView>
            );
          }}
          screenOptions={{
            drawerType: "slide",
            headerShown: false,
            headerTitleStyle: { fontWeight: "bold" },
            drawerActiveTintColor: "#D20103",
            drawerLabelStyle: { color: "#111" },
            overlayColor: "transparent",
            drawerStyle: {
              width: "66%",
              backgroundColor: "#FFE9D0",
              paddingHorizontal: 10,
            },
          }}
        >
        <Drawer.Screen name='index' component={Index} options={{
          title: "Home", drawerLabel: "Home", drawerIcon: () => <FontAwesome6 name="house" size={18} color="black" />
        }} />
        <Drawer.Screen name='profile' component={profile} options={{
          title: "Profile", drawerLabel: "Profile", drawerIcon: () => <FontAwesome5 name="user-alt" size={18} color="black" />
        }} />
        <Drawer.Screen name='setting' component={setting} options={{
          title: "Setting", drawerLabel: "Setting", drawerIcon: () => <Fontisto name="player-settings" size={18} color="black" />
        }} />
        <Drawer.Screen name='about' component={about} options={{
          title: "About", drawerLabel: "About", drawerIcon: () => <Fontisto name="info" size={18} color="black" />
        }} />
        <Drawer.Screen name='Gwalior_Fort' component={Gwalior_Fort} options={{
          title: "Gwalior_Fort", drawerLabel: "Gwalior_Fort", drawerItemStyle: { display: 'none' }
        }} />
          <Drawer.Screen name='Adalaj_Stepwell' component={Adalaj_Stepwell} options={{
          title: "Adalaj_Stepwell", drawerLabel: "Adalaj_Stepwell", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Agartala' component={Agartala} options={{
          title: "Agartala", drawerLabel: "Agartala", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Agatti_Island' component={Agatti_Island} options={{
          title: "Agatti_Island", drawerLabel: "Agatti_Island", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Agra_Fort' component={Agra_Fort} options={{
          title: "Agra_Fort", drawerLabel: "Agra_Fort", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Aguada_Fort' component={Aguada_Fort} options={{
          title: "Aguada_Fort", drawerLabel: "Aguada_Fort", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Aizawl' component={Aizawl} options={{
          title: "Aizawl", drawerLabel: "Aizawl", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Ajanta_Caves' component={Ajanta_Caves} options={{
          title: "Ajanta_Caves", drawerLabel: "Ajanta_Caves", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Akshardham_Temple' component={Akshardham_Temple} options={{
          title: "Akshardham_Temple", drawerLabel: "Akshardham_Temple", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Alappuzha_Beach' component={Alappuzha_Beach} options={{
          title: "Alappuzha_Beach", drawerLabel: "Alappuzha_Beach", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Almora' component={Almora} options={{
          title: "Almora", drawerLabel: "Almora", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Amarnath_Cave_Temple' component={Amarnath_Cave_Temple} options={{
          title: "Amarnath_Cave_Temple", drawerLabel: "Amarnath_Cave_Temple", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Ambedkar_Memorial_Park' component={Ambedkar_Memorial_Park} options={{
          title: "Ambedkar_Memorial_Park", drawerLabel: "Ambedkar_Memorial_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Amber_Palace' component={Amber_Palace} options={{
          title: "Amber_Palace", drawerLabel: "Amber_Palace", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Ambience_Mall_And_Valley_Park' component={Ambience_Mall_And_Valley_Park} options={{
          title: "Ambience_Mall_And_Valley_Park", drawerLabel: "Ambience_Mall_And_Valley_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Amini_Island' component={Amini_Island} options={{
          title: "Amini_Island", drawerLabel: "Amini_Island", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Amravati' component={Amravati} options={{
          title: "Amravati", drawerLabel: "Amravati", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Anandpur_Sahib' component={Anandpur_Sahib} options={{
          title: "Anandpur_Sahib", drawerLabel: "Anandpur_Sahib", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Andrott_Island' component={Andrott_Island} options={{
          title: "Andrott_Island", drawerLabel: "Andrott_Island", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Anthurium_Waterfall' component={Anthurium_Waterfall} options={{
          title: "Anthurium_Waterfall", drawerLabel: "Anthurium_Waterfall", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Araku_Valley' component={Araku_Valley} options={{
          title: "Araku_Valley", drawerLabel: "Araku_Valley", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Aravali_Biodiversity_Park' component={Aravali_Biodiversity_Park} options={{
          title: "Aravali_Biodiversity_Park", drawerLabel: "Aravali_Biodiversity_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Archaeological_Park' component={Archaeological_Park} options={{
          title: "Archaeological_Park", drawerLabel: "Archaeological_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Arikamedu' component={Arikamedu} options={{
          title: "Arikamedu", drawerLabel: "Arikamedu", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Ashoka_Pillar' component={Ashoka_Pillar} options={{
          title: "Ashoka_Pillar", drawerLabel: "Ashoka_Pillar", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Aurobindo_ashrm' component={Aurobindo_ashrm} options={{
          title: "Aurobindo_ashrm", drawerLabel: "Aurobindo_ashrm", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Auroville' component={Auroville} options={{
          title: "Auroville", drawerLabel: "Auroville", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Baba_Baidyanath_Mandir' component={Baba_Baidyanath_Mandir} options={{
          title: "Baba_Baidyanath_Mandir", drawerLabel: "Baba_Baidyanath_Mandir", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Baga_Beach' component={Baga_Beach} options={{
          title: "Baga_Beach", drawerLabel: "Baga_Beach", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Bamleshwari_Temple' component={Bamleshwari_Temple} options={{
          title: "Bamleshwari_Temple", drawerLabel: "Bamleshwari_Temple", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Bandhavgarh_National_Park' component={Bandhavgarh_National_Park} options={{
          title: "Bandhavgarh_National_Park", drawerLabel: "Bandhavgarh_National_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Bangalore_Fort' component={Bangalore_Fort} options={{
          title: "Bangalore_Fort", drawerLabel: "Bangalore_Fort", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Bangaram_Island' component={Bangaram_Island} options={{
          title: "Bangaram_Island", drawerLabel: "Bangaram_Island", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Banjhakri_Falls' component={Banjhakri_Falls} options={{
          title: "Banjhakri_Falls", drawerLabel: "Banjhakri_Falls", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Bannerghatta_Biological_Park' component={Bannerghatta_Biological_Park} options={{
          title: "Bannerghatta_Biological_Park", drawerLabel: "Bannerghatta_Biological_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='BAPS_Akshardham_Temple' component={BAPS_Akshardham_Temple} options={{
          title: "BAPS_Akshardham_Temple", drawerLabel: "BAPS_Akshardham_Temple", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Baratang_Island' component={Baratang_Island} options={{
          title: "Baratang_Island", drawerLabel: "Baratang_Island", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Barnawapara_Wildlife_Sanctuary' component={Barnawapara_Wildlife_Sanctuary} options={{
          title: "Barnawapara_Wildlife_Sanctuary", drawerLabel: "Barnawapara_Wildlife_Sanctuary", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Barren_Island' component={Barren_Island} options={{
          title: "Barren_Island", drawerLabel: "Barren_Island", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Basilica_of_Bom_Jesus' component={Basilica_of_Bom_Jesus} options={{
          title: "Basilica_of_Bom_Jesus", drawerLabel: "Basilica_of_Bom_Jesus", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Basilica_of_Jesus' component={Basilica_of_Jesus} options={{
          title: "Basilica_of_Jesus", drawerLabel: "Basilica_of_Jesus", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Basistha_Ashram' component={Basistha_Ashram} options={{
          title: "Basistha_Ashram", drawerLabel: "Basistha_Ashram", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Basset_Hills' component={Basset_Hills} options={{
          title: "Basset_Hills", drawerLabel: "Basset_Hills", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Bastar_Palace' component={Bastar_Palace} options={{
          title: "Bastar_Palace", drawerLabel: "Bastar_Palace", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Bengaluru' component={Bengaluru} options={{
          title: "Bengaluru", drawerLabel: "Bengaluru", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Bodh_Gaya' component={Bodh_Gaya} options={{
          title: "Bodh_Gaya", drawerLabel: "Bodh_Gaya", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Bogamati' component={Bogamati} options={{
          title: "Bogamati", drawerLabel: "Bogamati", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Bollywood_Tour' component={Bollywood_Tour} options={{
          title: "Bollywood_Tour", drawerLabel: "Bollywood_Tour", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Bomdila' component={Bomdila} options={{
          title: "Bomdila", drawerLabel: "Bomdila", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Borra_Caves' component={Borra_Caves} options={{
          title: "Borra_Caves", drawerLabel: "Borra_Caves", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Botanical_Garden' component={Botanical_Garden} options={{
          title: "Botanical_Garden", drawerLabel: "Botanical_Garden", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Brahma_Sarovar' component={Brahma_Sarovar} options={{
          title: "Brahma_Sarovar", drawerLabel: "Brahma_Sarovar", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Buddha_Smriti_Park' component={Buddha_Smriti_Park} options={{
          title: "Buddha_Smriti_Park", drawerLabel: "Buddha_Smriti_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Buddha_Jayanti_Park' component={Buddha_Jayanti_Park} options={{
          title: "Buddha_Jayanti_Park", drawerLabel: "Buddha_Jayanti_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Buddha_Park' component={Buddha_Park} options={{
          title: "Buddha_Park", drawerLabel: "Buddha_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Calangute_Beach' component={Calangute_Beach} options={{
          title: "Calangute_Beach", drawerLabel: "Calangute_Beach", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Cellular_Jail' component={Cellular_Jail} options={{
          title: "Cellular_Jail", drawerLabel: "Cellular_Jail", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Chadar_Trek' component={Chadar_Trek} options={{
          title: "Chadar_Trek", drawerLabel: "Chadar_Trek", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Chamarajendra_Park' component={Chamarajendra_Park} options={{
          title: "Chamarajendra_Park", drawerLabel: "Chamarajendra_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Champhai' component={Champhai} options={{
          title: "Champhai", drawerLabel: "Champhai", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Chapora_Fort' component={Chapora_Fort} options={{
          title: "Chapora_Fort", drawerLabel: "Chapora_Fort", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Charminar' component={Charminar} options={{
          title: "Charminar", drawerLabel: "Charminar", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Chatham_Saw_Mill' component={Chatham_Saw_Mill} options={{
          title: "Chatham_Saw_Mill", drawerLabel: "Chatham_Saw_Mill", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Chetlat_Island' component={Chetlat_Island} options={{
          title: "Chetlat_Island", drawerLabel: "Chetlat_Island", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Chidambaram_Nataraja_Temple' component={Chidambaram_Nataraja_Temple} options={{
          title: "Chidambaram_Nataraja_Temple", drawerLabel: "Chidambaram_Nataraja_Temple", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Chidiya_Tapu' component={Chidiya_Tapu} options={{
          title: "Chidiya_Tapu", drawerLabel: "Chidiya_Tapu", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Chitrakoot' component={Chitrakoot} options={{
          title: "Chitrakoot", drawerLabel: "Chitrakoot", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Chitrakote_Falls' component={Chitrakote_Falls} options={{
          title: "Chitrakote_Falls", drawerLabel: "Chitrakote_Falls", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Chittorgarh_Fort' component={Chittorgarh_Fort} options={{
          title: "Chittorgarh_Fort", drawerLabel: "Chittorgarh_Fort", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Chopta_Valley' component={Chopta_Valley} options={{
          title: "Chopta_Valley", drawerLabel: "Chopta_Valley", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Chowmahalla_Palace' component={Chowmahalla_Palace} options={{
          title: "Chowmahalla_Palace", drawerLabel: "Chowmahalla_Palace", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Chunnambar_Boat_House' component={Chunnambar_Boat_House} options={{
          title: "Chunnambar_Boat_House", drawerLabel: "Chunnambar_Boat_House", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='City_Palace' component={City_Palace} options={{
          title: "City_Palace", drawerLabel: "City_Palace", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Corbyns_Cove_Beach' component={Corbyns_Cove_Beach} options={{
          title: "Corbyns_Cove_Beach", drawerLabel: "Corbyns_Cove_Beach", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Cuttack_Museum' component={Cuttack_Museum} options={{
          title: "Cuttack_Museum", drawerLabel: "Cuttack_Museum", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dachigam_National_Park' component={Dachigam_National_Park} options={{
          title: "Dachigam_National_Park", drawerLabel: "Dachigam_National_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dainthlen_Waterfall' component={Dainthlen_Waterfall} options={{
          title: "Dainthlen_Waterfall", drawerLabel: "Dainthlen_Waterfall", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dakshineswar_Kali_Temple' component={Dakshineswar_Kali_Temple} options={{
          title: "Dakshineswar_Kali_Temple", drawerLabel: "Dakshineswar_Kali_Temple", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dal_Lake' component={Dal_Lake} options={{
          title: "Dal_Lake", drawerLabel: "Dal_Lake", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dalhousie' component={Dalhousie} options={{
          title: "Dalhousie", drawerLabel: "Dalhousie", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Daman_Ganga_River' component={Daman_Ganga_River} options={{
          title: "Daman_Ganga_River", drawerLabel: "Daman_Ganga_River", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dame_des_Anges' component={Dame_des_Anges} options={{
          title: "Dame_des_Anges", drawerLabel: "Dame_des_Anges", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dampui_Hill' component={Dampui_Hill} options={{
          title: "Dampui_Hill", drawerLabel: "Dampui_Hill", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Darjeeling' component={Darjeeling} options={{
          title: "Darjeeling", drawerLabel: "Darjeeling", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dashashwamedh_Ghat' component={Dashashwamedh_Ghat} options={{
          title: "Dashashwamedh_Ghat", drawerLabel: "Dashashwamedh_Ghat", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dassam_Falls' component={Dassam_Falls} options={{
          title: "Dassam_Falls", drawerLabel: "Dassam_Falls", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dawki' component={Dawki} options={{
          title: "Dawki", drawerLabel: "Dawki", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dehradun' component={Dehradun} options={{
          title: "Dehradun", drawerLabel: "Dehradun", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dharamshala' component={Dharamshala} options={{
          title: "Dharamshala", drawerLabel: "Dharamshala", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dhauli_Hill' component={Dhauli_Hill} options={{
          title: "Dhauli_Hill", drawerLabel: "Dhauli_Hill", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dibrugarh' component={Dibrugarh} options={{
          title: "Dibrugarh", drawerLabel: "Dibrugarh", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dilwara_Temples' component={Dilwara_Temples} options={{
          title: "Dilwara_Temples", drawerLabel: "Dilwara_Temples", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dimna_Lake' component={Dimna_Lake} options={{
          title: "Dimna_Lake", drawerLabel: "Dimna_Lake", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dirang_Valley' component={Dirang_Valley} options={{
          title: "Dirang_Valley", drawerLabel: "Dirang_Valley", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Diskit_Monastery' component={Diskit_Monastery} options={{
          title: "Diskit_Monastery", drawerLabel: "Diskit_Monastery", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dudhsagar_Falls' component={Dudhsagar_Falls} options={{
          title: "Dudhsagar_Falls", drawerLabel: "Dudhsagar_Falls", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Durtlang_Hills' component={Durtlang_Hills} options={{
          title: "Durtlang_Hills", drawerLabel: "Durtlang_Hills", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Dzukou_Valley' component={Dzukou_Valley} options={{
          title: "Dzukou_Valley", drawerLabel: "Dzukou_Valley", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Elephant_Beach' component={Elephant_Beach} options={{
          title: "Elephant_Beach", drawerLabel: "Elephant_Beach", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Ellora_Caves' component={Ellora_Caves} options={{
          title: "Ellora_Caves", drawerLabel: "Ellora_Caves", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Enchey_Monastery' component={Enchey_Monastery} options={{
          title: "Enchey_Monastery", drawerLabel: "Enchey_Monastery", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Eravikulam_National_Park' component={Eravikulam_National_Park} options={{
          title: "Eravikulam_National_Park", drawerLabel: "Eravikulam_National_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Falkawn_Village' component={Falkawn_Village} options={{
          title: "Falkawn_Village", drawerLabel: "Falkawn_Village", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Fatehgarh_Sahib' component={Fatehgarh_Sahib} options={{
          title: "Fatehgarh_Sahib", drawerLabel: "Fatehgarh_Sahib", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Folklore_Museum' component={Folklore_Museum} options={{
          title: "Folklore_Museum", drawerLabel: "Folklore_Museum", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Fort_Kochi' component={Fort_Kochi} options={{
          title: "Fort_Kochi", drawerLabel: "Fort_Kochi", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Fourteen_Gods_Temple' component={Fourteen_Gods_Temple} options={{
          title: "Fourteen_Gods_Temple", drawerLabel: "Fourteen_Gods_Temple", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='French_Quarter' component={French_Quarter} options={{
          title: "French_Quarter", drawerLabel: "French_Quarter", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Gandhi_Memorial_Museum' component={Gandhi_Memorial_Museum} options={{
          title: "Gandhi_Memorial_Museum", drawerLabel: "Gandhi_Memorial_Museum", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Gir_National_Park' component={Gir_National_Park} options={{
          title: "Gir_National_Park", drawerLabel: "Gir_National_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Golconda_Fort' component={Golconda_Fort} options={{
          title: "Golconda_Fort", drawerLabel: "Golconda_Fort", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Golden_Temple' component={Golden_Temple} options={{
          title: "Golden_Temple", drawerLabel: "Golden_Temple", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Golghar' component={Golghar} options={{
          title: "Golghar", drawerLabel: "Golghar", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Govindajee_Temple' component={Govindajee_Temple} options={{
          title: "Govindajee_Temple", drawerLabel: "Govindajee_Temple", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Gulmarg' component={Gulmarg} options={{
          title: "Gulmarg", drawerLabel: "Gulmarg", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Gurudongmar_Lake' component={Gurudongmar_Lake} options={{
          title: "Gurudongmar_Lake", drawerLabel: "Gurudongmar_Lake", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Gurudwara_10th_Paatshahi' component={Gurudwara_10th_Paatshahi} options={{
          title: "Gurudwara_10th_Paatshahi", drawerLabel: "Gurudwara_10th_Paatshahi", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Gurudwara_Panja_Sahib' component={Gurudwara_Panja_Sahib} options={{
          title: "Gurudwara_Panja_Sahib", drawerLabel: "Gurudwara_Panja_Sahib", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Gurudwara_Shri_Bangla' component={Gurudwara_Shri_Bangla} options={{
          title: "Gurudwara_Shri_Bangla", drawerLabel: "Gurudwara_Shri_Bangla", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Gurugram_Gurudwara' component={Gurugram_Gurudwara} options={{
          title: "Gurugram_Gurudwara", drawerLabel: "Gurugram_Gurudwara", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Guwahati' component={Guwahati} options={{
          title: "Guwahati", drawerLabel: "Guwahati", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Hadimba_Temple' component={Hadimba_Temple} options={{
          title: "Hadimba_Temple", drawerLabel: "Hadimba_Temple", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Haflong' component={Haflong} options={{
          title: "Haflong", drawerLabel: "Haflong", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Hamis_Gompa' component={Hamis_Gompa} options={{
          title: "Hamis_Gompa", drawerLabel: "Hamis_Gompa", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Hanuman_Mandir' component={Hanuman_Mandir} options={{
          title: "Hanuman_Mandir", drawerLabel: "Hanuman_Mandir", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Hanuman_Temple_Jakhu' component={Hanuman_Temple_Jakhu} options={{
          title: "Hanuman_Temple_Jakhu", drawerLabel: "Hanuman_Temple_Jakhu", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Hanuman_Tok' component={Hanuman_Tok} options={{
          title: "Hanuman_Tok", drawerLabel: "Hanuman_Tok", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Har_Ki_Pauri' component={Har_Ki_Pauri} options={{
          title: "Har_Ki_Pauri", drawerLabel: "Har_Ki_Pauri", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Haridwar' component={Haridwar} options={{
          title: "Haridwar", drawerLabel: "Haridwar", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Havelock_Island' component={Havelock_Island} options={{
          title: "Havelock_Island", drawerLabel: "Havelock_Island", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Hawa_Mahal' component={Hawa_Mahal} options={{
          title: "Hawa_Mahal", drawerLabel: "Hawa_Mahal", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Hayagriva_Madhava_Temple' component={Hayagriva_Madhava_Temple} options={{
          title: "Hayagriva_Madhava_Temple", drawerLabel: "Hayagriva_Madhava_Temple", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Hazratbal_Shrine' component={Hazratbal_Shrine} options={{
          title: "Hazratbal_Shrine", drawerLabel: "Hazratbal_Shrine", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Hemis_National_Park' component={Hemis_National_Park} options={{
          title: "Hemis_National_Park", drawerLabel: "Hemis_National_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Hill_Stations_of_Nilgiris' component={Hill_Stations_of_Nilgiris} options={{
          title: "Hill_Stations_of_Nilgiris", drawerLabel: "Hill_Stations_of_Nilgiris", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Himalayan_Zoological_Park' component={Himalayan_Zoological_Park} options={{
          title: "Himalayan_Zoological_Park", drawerLabel: "Himalayan_Zoological_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Himayvan_Kauncha' component={Himayvan_Kauncha} options={{
          title: "Himayvan_Kauncha", drawerLabel: "Himayvan_Kauncha", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Hirwavan_Garden' component={Hirwavan_Garden} options={{
          title: "Hirwavan_Garden", drawerLabel: "Hirwavan_Garden", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Hmuifang' component={Hmuifang} options={{
          title: "Hmuifang", drawerLabel: "Hmuifang", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Howrah_Bridge' component={Howrah_Bridge} options={{
          title: "Howrah_Bridge", drawerLabel: "Howrah_Bridge", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Humayuns_Tomb' component={Humayuns_Tomb} options={{
          title: "Humayuns_Tomb", drawerLabel: "Humayuns_Tomb", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Hundru_Falls' component={Hundru_Falls} options={{
          title: "Hundru_Falls", drawerLabel: "Hundru_Falls", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Hyderabad' component={Hyderabad} options={{
          title: "Hyderabad", drawerLabel: "Hyderabad", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Immaculate_Conception_Church' component={Immaculate_Conception_Church} options={{
          title: "Immaculate_Conception_Church", drawerLabel: "Immaculate_Conception_Church", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='India_Gate' component={India_Gate} options={{
          title: "India_Gate", drawerLabel: "India_Gate", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Indigenous_Tribes' component={Indigenous_Tribes} options={{
          title: "Indigenous_Tribes", drawerLabel: "Indigenous_Tribes", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='INS_Kurusura_Submarine_Museum' component={INS_Kurusura_Submarine_Museum} options={{
          title: "INS_Kurusura_Submarine_Museum", drawerLabel: "INS_Kurusura_Submarine_Museum", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='International_Shopping_Mall' component={International_Shopping_Mall} options={{
          title: "International_Shopping_Mall", drawerLabel: "International_Shopping_Mall", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='ISKCON_Temple_Bangalore' component={ISKCON_Temple_Bangalore} options={{
          title: "ISKCON_Temple_Bangalore", drawerLabel: "ISKCON_Temple_Bangalore", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='ISKCON_Temple' component={ISKCON_Temple} options={{
          title: "ISKCON_Temple", drawerLabel: "ISKCON_Temple", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Itanagar' component={Itanagar} options={{
          title: "Itanagar", drawerLabel: "Itanagar", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Jag_Mandir' component={Jag_Mandir} options={{
          title: "Jag_Mandir", drawerLabel: "Jag_Mandir", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Jagannath_Mandir' component={Jagannath_Mandir} options={{
          title: "Jagannath_Mandir", drawerLabel: "Jagannath_Mandir", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Jagannath_Temple_Puri' component={Jagannath_Temple_Puri} options={{
          title: "Jagannath_Temple_Puri", drawerLabel: "Jagannath_Temple_Puri", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Jagdish_Temple' component={Jagdish_Temple} options={{
          title: "Jagdish_Temple", drawerLabel: "Jagdish_Temple", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Jainath_Temple' component={Jainath_Temple} options={{
          title: "Jainath_Temple", drawerLabel: "Jainath_Temple", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Jal_Mahal' component={Jal_Mahal} options={{
          title: "Jal_Mahal", drawerLabel: "Jal_Mahal", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Jaldapara_National_Park' component={Jaldapara_National_Park} options={{
          title: "Jaldapara_National_Park", drawerLabel: "Jaldapara_National_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Jallianwala_Bagh' component={Jallianwala_Bagh} options={{
          title: "Jallianwala_Bagh", drawerLabel: "Jallianwala_Bagh", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Jama_Masjid' component={Jama_Masjid} options={{
          title: "Jama_Masjid", drawerLabel: "Jama_Masjid", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Jampui_Hills' component={Jampui_Hills} options={{
          title: "Jampui_Hills", drawerLabel: "Jampui_Hills", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Jantar_Mantar_Jaipur' component={Jantar_Mantar_Jaipur} options={{
          title: "Jantar_Mantar_Jaipur", drawerLabel: "Jantar_Mantar_Jaipur", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Jantar_Mantar' component={Jantar_Mantar} options={{
          title: "Jantar_Mantar", drawerLabel: "Jantar_Mantar", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Japfu_Peak' component={Japfu_Peak} options={{
          title: "Japfu_Peak", drawerLabel: "Japfu_Peak", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Jhansi_Fort' component={Jhansi_Fort} options={{
          title: "Jhansi_Fort", drawerLabel: "Jhansi_Fort", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Jim_Corbett_Park' component={Jim_Corbett_Park} options={{
          title: "Jim_Corbett_Park", drawerLabel: "Jim_Corbett_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Jonha_Falls' component={Jonha_Falls} options={{
          title: "Jonha_Falls", drawerLabel: "Jonha_Falls", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kachari_Ruins' component={Kachari_Ruins} options={{
          title: "Japfu_Kachari_RuinsPeak", drawerLabel: "Kachari_Ruins", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kadmat_Island' component={Kadmat_Island} options={{
          title: "Kadmat_Island", drawerLabel: "Kadmat_Island", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kailasanathar_Temple' component={Kailasanathar_Temple} options={{
          title: "Kailasanathar_Temple", drawerLabel: "Kailasanathar_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kala_Pathar_Beach' component={Kala_Pathar_Beach} options={{
          title: "Kala_Pathar_Beach", drawerLabel: "Kala_Pathar_Beach", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kalapeni_Island' component={Kalapeni_Island} options={{
          title: "Kalapeni_Island", drawerLabel: "Kalapeni_Island", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kalimpong' component={Kalimpong} options={{
          title: "Kalimpong", drawerLabel: "Kalimpong", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kanchenjunga_Falls' component={Kanchenjunga_Falls} options={{
          title: "Kanchenjunga_Falls", drawerLabel: "Kanchenjunga_Falls", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kanger_Valley_National_Park' component={Kanger_Valley_National_Park} options={{
          title: "Kanger_Valley_National_Park", drawerLabel: "Kanger_Valley_National_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kangla_Fort' component={Kangla_Fort} options={{
          title: "Kangla_Fort", drawerLabel: "Kangla_Fort", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kanha_National_Park' component={Kanha_National_Park} options={{
          title: "Kanha_National_Park", drawerLabel: "Kanha_National_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kanke_Dam' component={Kanke_Dam} options={{
          title: "Kanke_Dam", drawerLabel: "Kanke_Dam", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kapaleeshwarar_Temple' component={Kapaleeshwarar_Temple} options={{
          title: "Kapaleeshwarar_Temple", drawerLabel: "Kapaleeshwarar_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Karimganj' component={Karimganj} options={{
          title: "Karimganj", drawerLabel: "Karimganj", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kasauli' component={Kasauli} options={{
          title: "Kasauli", drawerLabel: "Kasauli", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kashi_Vishwanath_Temple' component={Kashi_Vishwanath_Temple} options={{
          title: "Kashi_Vishwanath_Temple", drawerLabel: "Kashi_Vishwanath_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kasol' component={Kasol} options={{
          title: "Kasol", drawerLabel: "Kasol", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kavaratti_Island' component={Kavaratti_Island} options={{
          title: "Kavaratti_Island", drawerLabel: "Kavaratti_Island", drawerItemStyle: { display: 'none' }
        }} />
          <Drawer.Screen name='Kaziranga_National_Park' component={Kaziranga_National_Park} options={{
          title: "Kaziranga_National_Park", drawerLabel: "Kaziranga_National_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Keibul_Lamjao_National_Park' component={Keibul_Lamjao_National_Park} options={{
          title: "Keibul_Lamjao_National_Park", drawerLabel: "Keibul_Lamjao_National_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Keshgarh_Sahib' component={Keshgarh_Sahib} options={{
          title: "Keshgarh_Sahib", drawerLabel: "Keshgarh_Sahib", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Khajuraho_Temples' component={Khajuraho_Temples} options={{
          title: "Khajuraho_Temples", drawerLabel: "Khajuraho_Temples", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Khandagiri_Caves' component={Khandagiri_Caves} options={{
          title: "Khandagiri_Caves", drawerLabel: "Khandagiri_Caves", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Khardung_La' component={Khardung_La} options={{
          title: "Khardung_La", drawerLabel: "Khardung_La", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kisama' component={Kisama} options={{
          title: "Kisama", drawerLabel: "Kisama", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kolkata' component={Kolkata} options={{
          title: "Kolkata", drawerLabel: "Kolkata", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Konark_Sun_Temple' component={Konark_Sun_Temple} options={{
          title: "Konark_Sun_Temple", drawerLabel: "Konark_Sun_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kovalam_Beach' component={Kovalam_Beach} options={{
          title: "Kovalam_Beach", drawerLabel: "Kovalam_Beach", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kovalam' component={Kovalam} options={{
          title: "Kovalam", drawerLabel: "Kovalam", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kumbakonam' component={Kumbakonam} options={{
          title: "Kumbakonam", drawerLabel: "Kumbakonam", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kumbhalgarh_Fort' component={Kumbhalgarh_Fort} options={{
          title: "Kumbhalgarh_Fort", drawerLabel: "Kumbhalgarh_Fort", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Kupwara' component={Kupwara} options={{
          title: "Kupwara", drawerLabel: "Kupwara", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Lachung' component={Lachung} options={{
          title: "Lachung", drawerLabel: "Lachung", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Lady_Of_Piety_Church' component={Lady_Of_Piety_Church} options={{
          title: "Lady_Of_Piety_Church", drawerLabel: "Lady_Of_Piety_Church", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Laitlum_Canyons' component={Laitlum_Canyons} options={{
          title: "Laitlum_Canyons", drawerLabel: "Laitlum_Canyons", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Lakshadweep' component={Lakshadweep} options={{
          title: "Lakshadweep", drawerLabel: "Lakshadweep", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Lalbagh_Botanical_Garden' component={Lalbagh_Botanical_Garden} options={{
          title: "Lalbagh_Botanical_Garden", drawerLabel: "Lalbagh_Botanical_Garden", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Lamayuru_Monastery' component={Lamayuru_Monastery} options={{
          title: "Lamayuru_Monastery", drawerLabel: "Lamayuru_Monastery", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Le_Corbusier_Centre' component={Le_Corbusier_Centre} options={{
          title: "Le_Corbusier_Centre", drawerLabel: "Le_Corbusier_Centre", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Leh_Ladakh' component={Leh_Ladakh} options={{
          title: "Leh_Ladakh", drawerLabel: "Leh_Ladakh", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Leh_Palace' component={Leh_Palace} options={{
          title: "Leh_Palace", drawerLabel: "Leh_Palace", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Leisure_Valley_Park' component={Leisure_Valley_Park} options={{
          title: "Leisure_Valley_Park", drawerLabel: "Leisure_Valley_Park", drawerItemStyle: { display: 'none' }
        }} />
        <Drawer.Screen name='Leisure_Valley' component={Leisure_Valley} options={{
          title: "Leisure_Valley", drawerLabel: "Leisure_Valley", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Lepakshi' component={Lepakshi} options={{
          title: "Lepakshi", drawerLabel: "Lepakshi", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Lingaraj_Temple' component={Lingaraj_Temple} options={{
          title: "Lingaraj_Temple", drawerLabel: "Lingaraj_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Living_Root_Bridges' component={Living_Root_Bridges} options={{
          title: "Living_Root_Bridges", drawerLabel: "Living_Root_Bridges", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Lodhi_Garden' component={Lodhi_Garden} options={{
          title: "Lodhi_Garden", drawerLabel: "Lodhi_Garden", drawerItemStyle: { display: 'none' }
        }} />
          <Drawer.Screen name='Loktak_Lake' component={Loktak_Lake} options={{
          title: "Loktak_Lake", drawerLabel: "Loktak_Lake", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Lonavala' component={Lonavala} options={{
          title: "Lonavala", drawerLabel: "Lonavala", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Lotus_Temple' component={Lotus_Temple} options={{
          title: "Lotus_Temple", drawerLabel: "Lotus_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Magnetic_Hill' component={Magnetic_Hill} options={{
          title: "Magnetic_Hill", drawerLabel: "Magnetic_Hill", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mahabaleshwar' component={Mahabaleshwar} options={{
          title: "Mahabaleshwar", drawerLabel: "Mahabaleshwar", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mahabodhi_Temple' component={Mahabodhi_Temple} options={{
          title: "Mahabodhi_Temple", drawerLabel: "Mahabodhi_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mahamaya_Temple' component={Mahamaya_Temple} options={{
          title: "Mahamaya_Temple", drawerLabel: "Mahamaya_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mahanadi_River' component={Mahanadi_River} options={{
          title: "Mahanadi_River", drawerLabel: "Mahanadi_River", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mahasamundra' component={Mahasamundra} options={{
          title: "Mahasamundra", drawerLabel: "Mahasamundra", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Manakula_Vinayagar_Temple' component={Manakula_Vinayagar_Temple} options={{
          title: "Manakula_Vinayagar_Temple", drawerLabel: "Manakula_Vinayagar_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Manali' component={Manali} options={{
          title: "Manali", drawerLabel: "Manali", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mandu' component={Mandu} options={{
          title: "Mandu", drawerLabel: "Mandu", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mantralayam' component={Mantralayam} options={{
          title: "Mantralayam", drawerLabel: "Mantralayam", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Marina_Beach' component={Marina_Beach} options={{
          title: "Marina_Beach", drawerLabel: "Marina_Beach", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Marine_National_Park' component={Marine_National_Park} options={{
          title: "Marine_National_Park", drawerLabel: "Marine_National_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Marudamalai_Temple' component={Marudamalai_Temple} options={{
          title: "Marudamalai_Temple", drawerLabel: "Marudamalai_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mathura' component={Mathura} options={{
          title: "Mathura", drawerLabel: "Mathura", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Meadow_of_Gold' component={Meadow_of_Gold} options={{
          title: "Meadow_of_Gold", drawerLabel: "Meadow_of_Gold", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mechuka_Valley' component={Mechuka_Valley} options={{
          title: "Mechuka_Valley", drawerLabel: "Mechuka_Valley", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Meenakshi_Amman_Temple' component={Meenakshi_Amman_Temple} options={{
          title: "Meenakshi_Amman_Temple", drawerLabel: "Meenakshi_Amman_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mehrangarh_Fort' component={Mehrangarh_Fort} options={{
          title: "Mehrangarh_Fort", drawerLabel: "Mehrangarh_Fort", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Minicoy_Island' component={Minicoy_Island} options={{
          title: "Minicoy_Island", drawerLabel: "Minicoy_Island", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Moirang' component={Moirang} options={{
          title: "Moirang", drawerLabel: "Moirang", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mokokchung_Fort' component={Mokokchung_Fort} options={{
          title: "Mokokchung_Fort", drawerLabel: "Mokokchung_Fort", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Monuments_at_Hampi' component={Monuments_at_Hampi} options={{
          title: "Monuments_at_Hampi", drawerLabel: "Monuments_at_Hampi", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Moriri_National_Park' component={Moriri_National_Park} options={{
          title: "Moriri_National_Park", drawerLabel: "Moriri_National_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Morni_Hills' component={Morni_Hills} options={{
          title: "Morni_Hills", drawerLabel: "Morni_Hills", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mount_Harriest_National_Park' component={Mount_Harriest_National_Park} options={{
          title: "Mount_Harriest_National_Park", drawerLabel: "Mount_Harriest_National_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mukteshwar_Temple' component={Mukteshwar_Temple} options={{
          title: "Mukteshwar_Temple", drawerLabel: "Mukteshwar_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mussoorie' component={Mussoorie} options={{
          title: "Mussoorie", drawerLabel: "Mussoorie", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mysore_Palace' component={Mysore_Palace} options={{
          title: "Mysore_Palace", drawerLabel: "Mysore_Palace", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Mysuru_Zoo' component={Mysuru_Zoo} options={{
          title: "Mysuru_Zoo", drawerLabel: "Mysuru_Zoo", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Nagarahole_Tiger_Reserve' component={Nagarahole_Tiger_Reserve} options={{
          title: "Nagarahole_Tiger_Reserve", drawerLabel: "Nagarahole_Tiger_Reserve", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Nainital' component={Nainital} options={{
          title: "Nainital", drawerLabel: "Nainital", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Nakshatra_Garden' component={Nakshatra_Garden} options={{
          title: "Nakshatra_Garden", drawerLabel: "Nakshatra_Garden", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Nalanda' component={Nalanda} options={{
          title: "Nalanda", drawerLabel: "Nalanda", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Namdapha_National_Park' component={Namdapha_National_Park} options={{
          title: "Namdapha_National_Park", drawerLabel: "Namdapha_National_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Nandan_Van_Zoo' component={Nandan_Van_Zoo} options={{
          title: "Nandan_Van_Zoo", drawerLabel: "Nandan_Van_Zoo", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Nandankanan_Zoological_Park' component={Nandankanan_Zoological_Park} options={{
          title: "Nandankanan_Zoological_Park", drawerLabel: "Nandankanan_Zoological_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Nataraja_Temple' component={Nataraja_Temple} options={{
          title: "Nataraja_Temple", drawerLabel: "Nataraja_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='National_Museum' component={National_Museum} options={{
          title: "National_Museum", drawerLabel: "National_Museum", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Neertal_Complex_Dudhani' component={Neertal_Complex_Dudhani} options={{
          title: "Neertal_Complex_Dudhani", drawerLabel: "Neertal_Complex_Dudhani", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Nehru_Zoological_Park' component={Nehru_Zoological_Park} options={{
          title: "Nehru_Zoological_Park", drawerLabel: "Nehru_Zoological_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Neil_Island' component={Neil_Island} options={{
          title: "Neil_Island", drawerLabel: "Neil_Island", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Nellaiappar_Temple' component={Nellaiappar_Temple} options={{
          title: "Nellaiappar_Temple", drawerLabel: "Nellaiappar_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Ngengpui_Wildlife_Sanctuary' component={Ngengpui_Wildlife_Sanctuary} options={{
          title: "Ngengpui_Wildlife_Sanctuary", drawerLabel: "Ngengpui_Wildlife_Sanctuary", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Nohkalikai_Falls' component={Nohkalikai_Falls} options={{
          title: "Nohkalikai_Falls", drawerLabel: "Nohkalikai_Falls", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='North_Bay_Island' component={North_Bay_Island} options={{
          title: "North_Bay_Island", drawerLabel: "North_Bay_Island", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Nubra_Valley' component={Nubra_Valley} options={{
          title: "Nubra_Valley", drawerLabel: "Nubra_Valley", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Orchha_Fort' component={Orchha_Fort} options={{
          title: "Orchha_Fort", drawerLabel: "Orchha_Fort", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Orchidarium' component={Orchidarium} options={{
          title: "Orchidarium", drawerLabel: "Orchidarium", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Pachmarhi' component={Pachmarhi} options={{
          title: "Pachmarhi", drawerLabel: "Pachmarhi", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Padmanabhaswamy_Temple' component={Padmanabhaswamy_Temple} options={{
          title: "Padmanabhaswamy_Temple", drawerLabel: "Padmanabhaswamy_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Pahalgam' component={Pahalgam} options={{
          title: "Pahalgam", drawerLabel: "Pahalgam", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Pahari_Temple_Ranchi' component={Pahari_Temple_Ranchi} options={{
          title: "Pahari_Temple_Ranchi", drawerLabel: "Pahari_Temple_Ranchi", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Palolem_Beach' component={Palolem_Beach} options={{
          title: "Palolem_Beach", drawerLabel: "Palolem_Beach", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Pangong_Tso' component={Pangong_Tso} options={{
          title: "Pangong_Tso", drawerLabel: "Pangong_Tso", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Paradise_Beach' component={Paradise_Beach} options={{
          title: "Paradise_Beach", drawerLabel: "Paradise_Beach", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Pasighat' component={Pasighat} options={{
          title: "Pasighat", drawerLabel: "Pasighat", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Patna_Museum' component={Patna_Museum} options={{
          title: "Patna_Museum", drawerLabel: "Patna_Museum", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Patnitop' component={Patnitop} options={{
          title: "Patnitop", drawerLabel: "Patnitop", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Patratu_Valley' component={Patratu_Valley} options={{
          title: "Patratu_Valley", drawerLabel: "Patratu_Valley", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Pelling' component={Pelling} options={{
          title: "Pelling", drawerLabel: "Pelling", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Periyar_National_Park' component={Periyar_National_Park} options={{
          title: "Periyar_National_Park", drawerLabel: "Periyar_National_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Phawngpui' component={Phawngpui} options={{
          title: "Phawngpui", drawerLabel: "Phawngpui", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Pondicherry_Museum' component={Pondicherry_Museum} options={{
          title: "Pondicherry_Museum", drawerLabel: "Pondicherry_Museum", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Prayagraj' component={Prayagraj} options={{
          title: "Prayagraj", drawerLabel: "Prayagraj", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Promenade_Beach' component={Promenade_Beach} options={{
          title: "Promenade_Beach", drawerLabel: "Promenade_Beach", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Pulwama' component={Pulwama} options={{
          title: "Pulwama", drawerLabel: "Pulwama", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Pune' component={Pune} options={{
          title: "Pune", drawerLabel: "Pune", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Punjab_Agricultural_University' component={Punjab_Agricultural_University} options={{
          title: "Punjab_Agricultural_University", drawerLabel: "Punjab_Agricultural_University", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Puri' component={Puri} options={{
          title: "Puri", drawerLabel: "Puri", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Qila_Mubarak' component={Qila_Mubarak} options={{
          title: "Qila_Mubarak", drawerLabel: "Qila_Mubarak", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Qutub_Minar' component={Qutub_Minar} options={{
          title: "Qutub_Minar", drawerLabel: "Qutub_Minar", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Radhanagar_Beach' component={Radhanagar_Beach} options={{
          title: "Radhanagar_Beach ", drawerLabel: "Radhanagar_Beach", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Raghavendra_Swamy_Temple' component={Raghavendra_Swamy_Temple} options={{
          title: "Raghavendra_Swamy_Temple", drawerLabel: "Raghavendra_Swamy_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Rameswaram' component={Rameswaram} options={{
          title: "Rameswaram", drawerLabel: "Rameswaram", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Ramoji_Film_City' component={Ramoji_Film_City} options={{
          title: "Ramoji_Film_City", drawerLabel: "Ramoji_Film_City", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Ranchi_Hill' component={Ranchi_Hill} options={{
          title: "Ranchi_Hill", drawerLabel: "Ranchi_Hill", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Rani_ki_Vav' component={Rani_ki_Vav} options={{
          title: "Rani_ki_Vav", drawerLabel: "Rani_ki_Vav", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Ranthambore_National_Park' component={Ranthambore_National_Park} options={{
          title: "Ranthambore_National_Park", drawerLabel: "Ranthambore_National_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Ravangla_Monastery' component={Ravangla_Monastery} options={{
          title: "Ravangla_Monastery", drawerLabel: "Ravangla_Monastery", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Red_Fort' component={Red_Fort} options={{
          title: "Red_Fort", drawerLabel: "Red_Fort", drawerItemStyle: { display: 'none' }
        }} />
           <Drawer.Screen name='Red_Hill' component={Red_Hill} options={{
          title: "Red_Hill", drawerLabel: "Red_Hill", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Reiek_Tlang' component={Reiek_Tlang} options={{
          title: "Reiek_Tlang", drawerLabel: "Reiek_Tlang", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Rimbi_Waterfall' component={Rimbi_Waterfall} options={{
          title: "Rimbi_Waterfall", drawerLabel: "Rimbi_Waterfall", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Rishikesh' component={Rishikesh} options={{
          title: "Rishikesh", drawerLabel: "Rishikesh", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Rock_Garden' component={Rock_Garden} options={{
          title: "Rock_Garden", drawerLabel: "Rock_Garden", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Roing' component={Roing} options={{
          title: "Roing", drawerLabel: "Roing", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Ronglien_Waterfall' component={Ronglien_Waterfall} options={{
          title: "Ronglien_Waterfall", drawerLabel: "Ronglien_Waterfall", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Ross_and_Smith_Islands' component={Ross_and_Smith_Islands} options={{
          title: "Ross_and_Smith_Islands", drawerLabel: "Ross_and_Smith_Islands", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Rudrasagar_Lake' component={Rudrasagar_Lake} options={{
          title: "Rudrasagar_Lake", drawerLabel: "Rudrasagar_Lake", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Rumtek_Monastery' component={Rumtek_Monastery} options={{
          title: "Rumtek_Monastery", drawerLabel: "Rumtek_Monastery", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sabarmati_Ashram' component={Sabarmati_Ashram} options={{
          title: "Sabarmati_Ashram", drawerLabel: "Sabarmati_Ashram", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sai_Ka_Angan_Temple' component={Sai_Ka_Angan_Temple} options={{
          title: "Sai_Ka_Angan_Temple", drawerLabel: "Sai_Ka_Angan_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Salar_Jung_Museum' component={Salar_Jung_Museum} options={{
          title: "Salar_Jung_Museum", drawerLabel: "Salar_Jung_Museum", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Samudrika_Marine_Museum' component={Samudrika_Marine_Museum} options={{
          title: "Samudrika_Marine_Museum", drawerLabel: "Samudrika_Marine_Museum", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sanchi_Stupa' component={Sanchi_Stupa} options={{
          title: "Sanchi_Stupa", drawerLabel: "Sanchi_Stupa", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sangai_Wildlife' component={Sangai_Wildlife} options={{
          title: "Sangai_Wildlife", drawerLabel: "Sangai_Wildlife", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sanjay_Gandhi_Biological_Park' component={Sanjay_Gandhi_Biological_Park} options={{
          title: "Sanjay_Gandhi_Biological_Park", drawerLabel: "Sanjay_Gandhi_Biological_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sarodhadadar_Village' component={Sarodhadadar_Village} options={{
          title: "Sarodhadadar_Village", drawerLabel: "Sarodhadadar_Village", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Satmalia_Deer_Sanctuary' component={Satmalia_Deer_Sanctuary} options={{
          title: "Satmalia_Deer_Sanctuary", drawerLabel: "Satmalia_Deer_Sanctuary", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Science_City' component={Science_City} options={{
          title: "Science_City", drawerLabel: "Science_City", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Scuba_Diving' component={Scuba_Diving} options={{
          title: "Scuba_Diving", drawerLabel: "Scuba_Diving", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Se_Cathedral' component={Se_Cathedral} options={{
          title: "Se_Cathedral", drawerLabel: "Se_Cathedral", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sector_17_Market' component={Sector_17_Market} options={{
          title: "Sector_17_Market", drawerLabel: "Sector_17_Market", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sela_Pass' component={Sela_Pass} options={{
          title: "Sela_Pass", drawerLabel: "Sela_Pass", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sentinalese_Tribe' component={Sentinalese_Tribe} options={{
          title: "Sentinalese_Tribe", drawerLabel: "Sentinalese_Tribe", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Seven_Sisters_Waterfall' component={Seven_Sisters_Waterfall} options={{
          title: "Seven_Sisters_Waterfall", drawerLabel: "Seven_Sisters_Waterfall", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Shakti_Peeth_Temple' component={Shakti_Peeth_Temple} options={{
          title: "Shakti_Peeth_Temple", drawerLabel: "Shakti_Peeth_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Shanti_Stupa' component={Shanti_Stupa} options={{
          title: "Shanti_Stupa", drawerLabel: "Shanti_Stupa", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sheesh_Mahal' component={Sheesh_Mahal} options={{
          title: "Sheesh_Mahal", drawerLabel: "Sheesh_Mahal", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sheetla_Mata_Mandir' component={Sheetla_Mata_Mandir} options={{
          title: "Sheetla_Mata_Mandir", drawerLabel: "Sheetla_Mata_Mandir", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Shey_Palace' component={Shey_Palace} options={{
          title: "Shey_Palace", drawerLabel: "Shey_Palace", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Shilloi_Lake' component={Shilloi_Lake} options={{
          title: "Shilloi_Lake", drawerLabel: "Shilloi_Lake", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Shimla' component={Shimla} options={{
          title: "Shimla", drawerLabel: "Shimla", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Shirdi_Sai_Mandir' component={Shirdi_Sai_Mandir} options={{
          title: "Shirdi_Sai_Mandir", drawerLabel: "Shirdi_Sai_Mandir", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Shnongpdeng' component={Shnongpdeng} options={{
          title: "Shnongpdeng", drawerLabel: "Shnongpdeng", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Shree_Dwarkadhish_Temple' component={Shree_Dwarkadhish_Temple} options={{
          title: "Shree_Dwarkadhish_Temple", drawerLabel: "Shree_Dwarkadhish_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Shree_Mangueshi_Temple' component={Shree_Mangueshi_Temple} options={{
          title: "Shree_Mangueshi_Temple", drawerLabel: "Shree_Mangueshi_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Shri_Kedarnath_Jyotirlinga_Temple' component={Shri_Kedarnath_Jyotirlinga_Temple} options={{
          title: "Shri_Kedarnath_Jyotirlinga_Temple", drawerLabel: "Shri_Kedarnath_Jyotirlinga_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Shri_Pathar_Sahib' component={Shri_Pathar_Sahib} options={{
          title: "Shri_Pathar_Sahib", drawerLabel: "Shri_Pathar_Sahib", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Siddhivinayak_Temple' component={Siddhivinayak_Temple} options={{
          title: "Siddhivinayak_Temple", drawerLabel: "Siddhivinayak_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sohra' component={Sohra} options={{
          title: "Sohra", drawerLabel: "Sohra", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Somnath_Temple' component={Somnath_Temple} options={{
          title: "Somnath_Temple", drawerLabel: "Somnath_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sonamarg' component={Sonamarg} options={{
          title: "Sonamarg", drawerLabel: "Sonamarg", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Spice_Gardens' component={Spice_Gardens} options={{
          title: "Spice_Gardens", drawerLabel: "Spice_Gardens", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Spiti_Valley' component={Spiti_Valley} options={{
          title: "Spiti_Valley", drawerLabel: "Spiti_Valley", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Spituk_Monastery' component={Spituk_Monastery} options={{
          title: "Spituk_Monastery", drawerLabel: "Spituk_Monastery", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sri_Aurobindo_Ashram' component={Sri_Aurobindo_Ashram} options={{
          title: "Sri_Aurobindo_Ashram", drawerLabel: "Sri_Aurobindo_Ashram", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Srinagar' component={Srinagar} options={{
          title: "Srinagar", drawerLabel: "Srinagar", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='State_Museum' component={State_Museum} options={{
          title: "State_Museum", drawerLabel: "State_Museum", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Statue_of_Unity' component={Statue_of_Unity} options={{
          title: "Statue_of_Unity", drawerLabel: "Statue_of_Unity", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Stok_Kangri' component={Stok_Kangri} options={{
          title: "Stok_Kangri", drawerLabel: "Stok_Kangri", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sualkuchi' component={Sualkuchi} options={{
          title: "Sualkuchi", drawerLabel: "Sualkuchi", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Suheli_Par' component={Suheli_Par} options={{
          title: "Suheli_Par", drawerLabel: "Suheli_Par", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sukhna_Lake' component={Sukhna_Lake} options={{
          title: "Sukhna_Lake", drawerLabel: "Sukhna_Lake", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sultanpur_National_Park' component={Sultanpur_National_Park} options={{
          title: "Sultanpur_National_Park", drawerLabel: "Sultanpur_National_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Sweet_Falls' component={Sweet_Falls} options={{
          title: "Sweet_Falls", drawerLabel: "Sweet_Falls", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tagore_Hill' component={Tagore_Hill} options={{
          title: "Tagore_Hill", drawerLabel: "Tagore_Hill", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Taj_Falaknuma_Palace' component={Taj_Falaknuma_Palace} options={{
          title: "Taj_Falaknuma_Palace", drawerLabel: "Taj_Falaknuma_Palace", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Taj_Mahal' component={Taj_Mahal} options={{
          title: "Taj_Mahal", drawerLabel: "Taj_Mahal", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Takht_Sri_Harmandir_Sahib_Ji' component={Takht_Sri_Harmandir_Sahib_Ji} options={{
          title: "Takht_Sri_Harmandir_Sahib_Ji", drawerLabel: "Takht_Sri_Harmandir_Sahib_Ji", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tam_Dil' component={Tam_Dil} options={{
          title: "Tam_Dil", drawerLabel: "Tam_Dil", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tashi_View_Point' component={Tashi_View_Point} options={{
          title: "Tashi_View_Point", drawerLabel: "Tashi_View_Point", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tashiding_Monastery' component={Tashiding_Monastery} options={{
          title: "Tashiding_Monastery", drawerLabel: "Tashiding_Monastery", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tawang_Monastery' component={Tawang_Monastery} options={{
          title: "Tawang_Monastery", drawerLabel: "Tawang_Monastery", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tezu' component={Tezu} options={{
          title: "Tezu", drawerLabel: "Tezu", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tharon_Cave' component={Tharon_Cave} options={{
          title: "Tharon_Cave", drawerLabel: "Tharon_Cave", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='The_Silva_Store' component={The_Silva_Store} options={{
          title: "The_Silva_Store", drawerLabel: "The_Silva_Store", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Thekkady' component={Thekkady} options={{
          title: "Thekkady", drawerLabel: "Thekkady", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Thiksey_Monastery' component={Thiksey_Monastery} options={{
          title: "Thiksey_Monastery", drawerLabel: "Thiksey_Monastery", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Thiruvalluvar_Statue' component={Thiruvalluvar_Statue} options={{
          title: "Thiruvalluvar_Statue", drawerLabel: "Thiruvalluvar_Statue", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Thotlakonda_Buddhist_Monastery' component={Thotlakonda_Buddhist_Monastery} options={{
          title: "Thotlakonda_Buddhist_Monastery", drawerLabel: "Thotlakonda_Buddhist_Monastery", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tiger_Reserve' component={Tiger_Reserve} options={{
          title: "Tiger_Reserve", drawerLabel: "Tiger_Reserve", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tirathgarh_Waterfall' component={Tirathgarh_Waterfall} options={{
          title: "Tirathgarh_Waterfall", drawerLabel: "Tirathgarh_Waterfall", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tirthan_Valley' component={Tirthan_Valley} options={{
          title: "Tirthan_Valley", drawerLabel: "Tirthan_Valley", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tirupati' component={Tirupati} options={{
          title: "Tirupati", drawerLabel: "Tirupati", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tribal_Museum_Silvassa' component={Tribal_Museum_Silvassa} options={{
          title: "Tribal_Museum_Silvassa", drawerLabel: "Tribal_Museum_Silvassa", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Trimbakeshwar_Temple' component={Trimbakeshwar_Temple} options={{
          title: "Trimbakeshwar_Temple", drawerLabel: "Trimbakeshwar_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tripura_State_Museum' component={Tripura_State_Museum} options={{
          title: "Tripura_State_Museum", drawerLabel: "Tripura_State_Museum", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Trishna_Wild_Life_Sanctuary' component={Trishna_Wild_Life_Sanctuary} options={{
          title: "Trishna_Wild_Life_Sanctuary", drawerLabel: "Trishna_Wild_Life_Sanctuary", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tropical_Climate' component={Tropical_Climate} options={{
          title: "Tropical_Climate", drawerLabel: "Tropical_Climate", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tso_Moriri' component={Tso_Moriri} options={{
          title: "Tso_Moriri", drawerLabel: "Tso_Moriri", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tsomgo_Lake' component={Tsomgo_Lake} options={{
          title: "Tsomgo_Lake", drawerLabel: "Tsomgo_Lake", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tungnath_Temple' component={Tungnath_Temple} options={{
          title: "Tungnath_Temple", drawerLabel: "Tungnath_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Tuophema' component={Tuophema} options={{
          title: "Tuophema", drawerLabel: "Tuophema", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='UB_City' component={UB_City} options={{
          title: "UB_City", drawerLabel: "UB_City", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Ujjain_Temple' component={Ujjain_Temple} options={{
          title: "Ujjain_Temple", drawerLabel: "Ujjain_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Ujjayanta_Palace' component={Ujjayanta_Palace} options={{
          title: "Ujjayanta_Palace", drawerLabel: "Ujjayanta_Palace", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Ukhrul' component={Ukhrul} options={{
          title: "Ukhrul", drawerLabel: "Ukhrul", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Umiam_Lake' component={Umiam_Lake} options={{
          title: "Umiam_Lake", drawerLabel: "Umiam_Lake", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Unakoti_Rock_Carvings' component={Unakoti_Rock_Carvings} options={{
          title: "Unakoti_Rock_Carvings", drawerLabel: "Unakoti_Rock_Carvings", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Vaishno_Devi_Temple' component={Vaishno_Devi_Temple} options={{
          title: "Vaishno_Devi_Temple", drawerLabel: "Vaishno_Devi_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Valley_Of_Flowers_National_Park' component={Valley_Of_Flowers_National_Park} options={{
          title: "Valley_Of_Flowers_National_Park", drawerLabel: "Valley_Of_Flowers_National_Park", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Valley_of_Gods' component={Valley_of_Gods} options={{
          title: "Valley_of_Gods", drawerLabel: "Valley_of_Gods", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Valluvar_Kottam' component={Valluvar_Kottam} options={{
          title: "Valluvar_Kottam", drawerLabel: "Valluvar_Kottam", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Vantawng_Falls' component={Vantawng_Falls} options={{
          title: "Vantawng_Falls", drawerLabel: "Vantawng_Falls", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Varanasi' component={Varanasi} options={{
          title: "Varanasi", drawerLabel: "Varanasi", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Vasona_Lion_Safari' component={Vasona_Lion_Safari} options={{
          title: "Vasona_Lion_Safari", drawerLabel: "Vasona_Lion_Safari", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Vellore_Fort' component={Vellore_Fort} options={{
          title: "Vellore_Fort", drawerLabel: "Vellore_Fort", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Victoria_Memorial' component={Victoria_Memorial} options={{
          title: "Victoria_Memorial", drawerLabel: "Victoria_Memorial", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Vikramshila' component={Vikramshila} options={{
          title: "Vikramshila", drawerLabel: "Vikramshila", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Vila_Palace' component={Vila_Palace} options={{
          title: "Vila_Palace", drawerLabel: "Vila_Palace", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Viper_Island' component={Viper_Island} options={{
          title: "Viper_Island", drawerLabel: "Viper_Island", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Virupaksha_Temple' component={Virupaksha_Temple} options={{
          title: "Virupaksha_Temple", drawerLabel: "Virupaksha_Temple", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Visakhapatnam' component={Visakhapatnam} options={{
          title: "Visakhapatnam", drawerLabel: "Visakhapatnam", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Vivekananda_Rock' component={Vivekananda_Rock} options={{
          title: "Vivekananda_Rock", drawerLabel: "Vivekananda_Rock", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Vrindavan' component={Vrindavan} options={{
          title: "Vrindavan", drawerLabel: "Vrindavan", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Wagah_Border' component={Wagah_Border} options={{
          title: "Wagah_Border", drawerLabel: "Wagah_Border", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Wayanad' component={Wayanad} options={{
          title: "Wayanad", drawerLabel: "Wayanad", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Wokha_Dam' component={Wokha_Dam} options={{
          title: "Wokha_Dam", drawerLabel: "Wokha_Dam", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Yadavindra_Gardens' component={Yadavindra_Gardens} options={{
          title: "Yadavindra_Gardens", drawerLabel: "Yadavindra_Gardens", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Yumthang_Valley' component={Yumthang_Valley} options={{
          title: "Yumthang_Valley", drawerLabel: "Yumthang_Valley", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Zakir_Hussain_Rose_Garden' component={Zakir_Hussain_Rose_Garden} options={{
          title: "Zakir_Hussain_Rose_Garden", drawerLabel: "Zakir_Hussain_Rose_Garden", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Ziro_Valley' component={Ziro_Valley} options={{
          title: "Ziro_Valley", drawerLabel: "Ziro_Valley", drawerItemStyle: { display: 'none' }
        }} />
         <Drawer.Screen name='Zoological_Park' component={Zoological_Park} options={{
          title: "Zoological_Park", drawerLabel: "Zoological_Park", drawerItemStyle: { display: 'none' }
        }} />
        </Drawer.Navigator>
        ) : (<Drawer.Navigator
          screenOptions={{
            drawerType: "slide",
            headerShown: false,
            headerTitleStyle: { fontWeight: "bold" },
            drawerActiveTintColor: "#D20103",
            drawerLabelStyle: { color: "#111" },
            overlayColor: "transparent",
            drawerStyle: {
              width: "66%",
              backgroundColor: "#FFE9D0",
              paddingTop: 15,
            },
          }}
        >
          <Drawer.Screen name='index' component={Index} options={{
            title: "Home", drawerLabel: "Home", drawerIcon: () => <FontAwesome6 name="house" size={18} color="black" />
          }} />
          <Drawer.Screen name='register' component={register} options={{
            title: "Register", drawerLabel: "Register", drawerIcon: () => <Entypo name="add-user" size={18} color="black" />
          }} />
          <Drawer.Screen name='login' component={login} options={{
            title: "Login", drawerLabel: "Login", drawerIcon: () => <Entypo name="login" size={18} color="black" />
          }} />
        </Drawer.Navigator>
        )
      }
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#8533ff",
    width: '100%',
    height: height * 0.06,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    marginVertical: height * 0.02,
  },
  text: {
    fontSize: width * 0.04,
    color: "white",
    fontWeight: "bold",
  },
});

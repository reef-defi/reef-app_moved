import React from 'react';

export const ReefLogo = (): JSX.Element => (
  <svg viewBox="0 0 145 73" className="reef-logo">
    <defs>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="logograd">
        <stop stopColor="#681CFF" offset="0%" />
        <stop stopColor="#FD3F83" offset="100%" />
      </linearGradient>
    </defs>
    <path d="M127.702087 48.6662471c-.861619 0-1.667919.1804023-2.418064.542046-.750144.333954-1.403902.7937701-1.960433 1.3777701-.555694.5848391-.999914 1.2661724-1.333498 2.0448391-.305924.7518161-.458468 1.5447471-.458468 2.3796322 0 .667908.124885 1.3081264.375492 1.9198161.249768.5848391.583352 1.0991954 1.000751 1.5447471.44422.4455517.958844.792931 1.542197 1.042977.583352.2785747 1.20945.4178621 1.87578.4178621.806301 0 1.569855-.1804023 2.294017-.5428851.723324-.333954 1.348584-.792931 1.876619-1.3777701.554855-.6116896.985665-1.3072873 1.291589-2.085954.333584-.7795058.500376-1.6001265.500376-2.4627012 0-1.3635057-.430809-2.5046551-1.292428-3.4226092-.833959-.9187931-1.931936-1.3777701-3.29393-1.3777701z" fill="url(#logograd)" />
    <path d="M83.8787283 45.1618276c.3327457-.7795058.7367341-1.5867012 1.2086127-2.4207471.473555-.8634138 1.0015896-1.7251495 1.5849422-2.5877242.6118497-.8634138 1.2924278-1.6286552 2.0434104-2.2965632.7778035-.6955977 1.6260116-1.251908 2.542948-1.668931.9169364-.417023 1.9042775-.6259541 2.9603468-.6259541h.3754914c.1106358 0 .234682.0134253.373815.041115.334422.0562184.6260983.208931.875867.4598161.2782659.250046.4173989.584.4173989 1.001862 0 .500092-.2363584 1.0991955-.708237 1.7939541-.4727168.6687471-1.3343353 1.3911954-2.5848555 2.1707011-.2782659.166977-.7643931.4875058-1.4592196.9599081-.6671677.4732413-1.4600578 1.001862-2.3769943 1.585862-.9169364.5848391-1.9042774 1.1973679-2.9611849 1.8367472-1.0275723.6402184-2.0283237 1.2107931-3.0005781 1.7117241.1667919-.5286207.4031503-1.1831034.708237-1.9617701m-28.1425722-2.4207471c.4718786-.8634138.9999133-1.7251495 1.584104-2.5877242.6118497-.8634138 1.2924278-1.6286552 2.0434104-2.2965632.7778035-.6955977 1.6251734-1.251908 2.542948-1.668931.9177746-.417023 1.9042775-.6259541 2.9603468-.6259541h.3754913c.1106359 0 .2355203.0134253.3746532.041115.3335838.0562184.6252601.208931.8758671.4598161.2782659.250046.4173988.584.4173988 1.001862 0 .500092-.2363584 1.0991955-.7090751 1.7939541-.4727168.6687471-1.3343353 1.3911954-2.5856937 2.1707011-.2774277.166977-.7635549.4875058-1.4592196.9599081-.6663295.4732413-1.4583815 1.001862-2.3761561 1.585862-.9177746.5848391-1.9034393 1.1973679-2.9603468 1.8367472-.9513006.5923908-1.8766185 1.1184942-2.7809827 1.5917356-.039393-.0545402-.0804624-.1082414-.1265607-.1577471.1592486-.479115.3570521-1.0270345.6143642-1.6840345.3335838-.7795058.7367341-1.5867012 1.2094509-2.4207471m88.0141619-27.2138966c-.333584-.9464828-.778642-1.7259885-1.334335-2.3376782-.528035-.6125287-1.153295-1.0715057-1.875781-1.3777701-.694826-.3054253-1.43156-.458977-2.210202-.458977-1.667081 0-3.418815.292-5.252688.876-1.807052.5848391-3.669422 1.6286552-5.58711 3.1306092-1.917688 1.5027931-3.877283 3.5484713-5.878786 6.1361954-1.973844 2.5877242-3.94685 5.871046-5.920693 9.8508046h-4.919943c-1.333497 0-2.348497.3196897-3.043323.9599081-.694827.6116896-1.042659 1.251908-1.042659 1.9198161 0 .6393793.278266 1.1965287.833959 1.6697701.556532.4732413 1.598353.709023 3.127139.709023h2.210202l-4.608988 9.7778046c-.280781.146839-.687283.3784252-1.228728.698954-.722486.4455517-1.640261.9741724-2.751648 1.585862-1.083728.6125288-2.306589 1.2661725-3.668584 1.9617702-1.3619939.667908-2.7667338 1.2947011-4.2108668 1.8787011-1.4189884.584-2.8631214 1.0715058-4.3365896 1.4608391-1.4449711.3616437-2.8069653.542885-4.0859826.542885-1.1952023 0-2.1540463-.2231954-2.87737-.667908-.7216474-.4732414-1.1524566-1.1134598-1.2915896-1.9198161 3.7800578-1.3920345 6.920607-2.7689655 9.4224856-4.1324713 2.5295376-1.3911954 4.5444509-2.7412758 6.045578-4.0485632 1.501127-1.3358161 2.557197-2.6439425 3.168208-3.9235402.61185-1.2804368.917775-2.5046552.917775-3.6734943 0-1.9760344-.569943-3.5199425-1.710665-4.6334023-1.138208-1.1126206-2.8614451-1.668931-5.169711-1.668931-2.1951156 0-4.2653469.3196897-6.21237.9599081-1.9168497.6402183-3.6819942 1.4885287-5.2937572 2.5457701-1.6126012 1.0580804-3.0718208 2.2822988-4.377659 3.6734942-1.2790173 1.3635058-2.3627456 2.7689655-3.2528612 4.2155403-.8892775 1.4465747-1.5698555 2.8939885-2.0425723 4.3414023-.3872254 1.1604482-.6068208 2.2437011-.6772254 3.2556321-1.009133.5638621-2.1272255 1.1612874-3.3668497 1.7939541-1.3619943.667908-2.765896 1.2947011-4.2117052 1.8787011-1.4173122.584-2.8631214 1.0715058-4.3357515 1.4608391-1.4449711.3616437-2.8069653.542885-4.0859826.542885-1.1952024 0-2.1540463-.2231954-2.8765318-.667908-.7224856-.4732414-1.1532948-1.1134598-1.2924278-1.9198161 3.7800578-1.3920345 6.9214451-2.7689655 9.4224856-4.1324713 2.5295375-1.3911954 4.5444508-2.7412758 6.045578-4.0485632C71.4129191 42.4071264 72.4689884 41.099 73.08 39.8194023c.6118497-1.2804368.9177746-2.5046552.9177746-3.6734943 0-1.9760344-.5699422-3.5199425-1.7098266-4.6334023-1.1390463-1.1126206-2.8622833-1.668931-5.169711-1.668931-2.1959538 0-4.266185.3196897-6.2123699.9599081-1.9176879.6402183-3.6828324 1.4885287-5.2954336 2.5457701-1.6109248 1.0580804-3.0709826 2.2822988-4.3768208 3.6734942-1.2790173 1.3635058-2.3635838 2.7689655-3.2520231 4.2155403-.8901156 1.4465747-1.5706936 2.8939885-2.0434104 4.3414023-.4727168 1.4180459-.708237 2.7261724-.708237 3.9227011 0 .740069.0569942 1.4633563.1634393 2.1723793-.8163584.5017701-1.7358092.9758506-2.782659 1.4172069-1.5849422.6679081-3.391156 1.0018621-5.4203179 1.0018621h-.5833526c-.195289 0-.4039884-.0142644-.6252601-.041954-1.1130636-.083069-2.1682948-.6393794-3.1698844-1.6697702-.9999133-1.0295517-1.9176878-2.2671954-2.7516474-3.7146092-.8054624-1.4742643-1.500289-3.0190114-2.0844798-4.6325632-.5556936-1.6420804-.9588439-3.1171839-1.2094508-4.4244712 1.779393-.3062644 3.614104-.8071954 5.5041329-1.5027931 1.9176879-.6955977 3.780896-1.5447472 5.5871099-2.5457702 1.8062138-1.001862 3.50263-2.1430114 5.0858959-3.4234482 1.6126012-1.3072874 3.0165029-2.7261724 4.2117052-4.2566552 1.1943642-1.5581724 2.1397977-3.2136782 2.8346243-4.9673563.7233237-1.7805288 1.0837283-3.6449655 1.0837283-5.5933104 0-2.8931494-.5976011-5.4254942-1.7919653-7.59619537-1.1675434-2.17070115-2.7524856-3.96465517-4.7531503-5.38437931-2.0015029-1.44741379-4.3089306-2.53234483-6.9214451-3.25563219C35.0221098.36164368 32.3123699 0 29.4769075 0c-2.8907803 0-5.6281792.30626437-8.2130347.91795402-2.5856936.584-4.9760982 1.37777012-7.172052 2.37879311-2.1682948.97417241-4.12789016 2.11532184-5.87794797 3.42344827-1.7517341 1.2795977-3.23861271 2.6154138-4.46231214 4.0066092C2.55719653 12.118 1.62601156 13.5091954.95884393 14.9003908.32017341 16.2915862 0 17.5862874 0 18.7828161c0 1.2795977.34783237 2.2814598 1.04182081 3.0047471.69482659.6955977 1.73748555 1.0438161 3.12713873 1.0438161 1.0284104 0 1.8900289-.2366207 2.58485549-.7098621.69566474-.4732413 1.32092485-1.084931 1.8766185-1.835908.5833526-.7518161 1.13988439-1.6143908 1.66791907-2.5885632.5280347-.9741724 1.1113873-1.9751954 1.750896-3.0047471.6671676-1.0303909 1.4449711-2.0314138 2.3350867-3.0055863.9169364-.9741724 2.0291618-1.835908 3.335-2.58772409 1.3343352-.7518161 2.9041907-1.36350575 4.7120809-1.83674713 1.8338728-.47324138 4.0164162-.70986207 6.5451156-.70986207 2.2521098 0 4.1832081.26431035 5.7949711.79377012 1.6402601.52862068 2.9745954 1.23764367 4.0030058 2.12874712 1.0560693.89026435 1.8204624 1.93324135 2.2931792 3.12977015.5003757 1.1965287.7501445 2.4627011.7501445 3.7985172 0 1.8644368-.4718786 3.7842529-1.4173122 5.7602874-.9177745 1.9751954-2.1825433 3.7699885-3.7934682 5.3843793-1.6126011 1.6135517-3.50263 2.9493678-5.6709248 4.0066092-2.1406359 1.0295517-4.4187284 1.5447471-6.8376301 1.5447471h-.5841907c-.1667919 0-.3327457-.0142644-.4995376-.041954.7224855-1.5304828 1.4173121-3.0190115 2.0844798-4.4664253.6671676-1.4742644 1.2505202-2.8243448 1.7508959-4.0485632.5003757-1.2242184.903526-2.3091495 1.2086127-3.2556322.306763-.9464828.4593064-1.6831954.4593064-2.2118161s-.0829769-.9599081-.250607-1.2938621c-.1667919-.3616437-.3604046-.625954-.5833526-.7937701-.2229479-.1946667-.4718786-.3196896-.7501445-.375069-.2782659-.083908-.5146242-.1250229-.7090751-.1250229-.7224856 0-1.5430347.4170229-2.4599711 1.251908-.8892775.8071954-1.8481214 1.8921264-2.8765318 3.2556322-1.0015896 1.3635057-2.0434104 2.9359425-3.1271387 4.7164712-1.0569075 1.7528391-2.1121388 3.576161-3.1690463 5.4674483L2.29317919 53.717931c-.30592485.5848391-.54228324 1.2107931-.70907514 1.8787012-.16679191.667908-.24976879 1.3215517-.24976879 1.9617701 0 .4455517.05531792.917954.16679191 1.4188851.13913295.500931.36124277.959908.66716763 1.3777701.3050867.417023.7367341.7652414 1.29242774 1.042977.55569364.2785747 1.27817919.4178621 2.1682948.4178621 1.08372832 0 2.08447977-.3901725 3.00141619-1.1688391.91693641-.7795058 1.77939307-1.7947931 2.58485547-3.0467012.8063006-1.2804368 1.5430347-2.7135862 2.2093642-4.2994483.6671676-1.6143908 1.3066763-3.2422069 1.9176878-4.8834482.6118498-1.6420805 1.1826301-3.2279426 1.7106648-4.7584253.5271965-1.5581724 1.0418208-2.9074138 1.5413584-4.0485632.8901156 2.8939885 1.9051156 5.6486896 3.0441618 8.2641034 1.1398844 2.5877242 2.403815 4.8557586 3.7943064 6.8032644 1.3896531 1.9483448 2.9326878 3.4922529 4.6274277 4.6334023 1.6955781 1.1411494 3.5445376 1.7117241 5.5452023 1.7117241 2.4457226 0 5.0314162-.6125287 7.7554047-1.8367471 1.3184104-.5999425 2.6502312-1.3710575 3.9946242-2.3032759.195289.2911609.4039885.5722529.6260983.8424368.9169364 1.084931 2.0149133 1.9475058 3.2939306 2.5877241 1.3058382.6402184 2.7927168.9599081 4.4606359.9599081 1.9453468 0 3.9191907-.2643104 5.9198555-.792931 2.0015029-.5009311 3.9200289-1.1411495 5.7547398-1.9198161 1.8615318-.7795058 3.6124278-1.6278161 5.2526879-2.5466092 1.0049422-.5697357 1.9243931-1.1168161 2.7784682-1.647115.462659 1.2535862 1.0870809 2.3779541 1.8908671 3.3588391.9177745 1.084931 2.0157514 1.9475058 3.2939306 2.5877241 1.3066763.6402184 2.7935549.9599081 4.4606358.9599081 1.946185 0 3.9200289-.2643104 5.9215318-.792931 2.0006648-.5009311 3.9191908-1.1411495 5.7530636-1.9198161 1.86237-.7795058 3.6132656-1.6278161 5.2535256-2.5466092.831446-.4715632 1.610925-.9288621 2.33844-1.3727357l-6.2157228 13.1853104c-.306763.6402184-.5422832 1.1965287-.7090752 1.668931-.1667919.5017701-.2497687.9330575-.2497687 1.2947012 0 .7232873.2640173 1.251908.7912138 1.585862.5288729.3339541 1.126474.5009311 1.7936417.5009311.4727172 0 .9865032-.1115977 1.5421962-.3339541.556532-.1946666 1.097977-.4866666 1.626012-.876839.528873-.3893334 1.015-.8617357 1.459219-1.4188851.445058-.5286207.82055-1.1126207 1.125636-1.7528391.445058-.8902643 1.029249-2.1010574 1.751734-3.6315402.722486-1.5027931 1.528787-3.1859885 2.418064-5.0504253.889277-1.8921264 1.820462-3.8815862 2.793555-5.9683793 1.000751-2.1153218 1.987254-4.2021149 2.960347-6.2612184 1.000751-2.0591034 1.945347-4.0208736 2.834624-5.8853103.917775-1.8921265 1.737486-3.5476322 2.459971-4.9665173h7.255029c1.222861-.0285287 2.473382-.0562184 3.751561-.083908 1.306676-.0276897 2.682919-.0696437 4.12789-.125023.750983-.0562184 1.361994-.166977 1.834711-.333954.472717-.1946667.833959-.417023 1.083728-.6679081.278266-.2785747.472717-.5705747.584191-.8768391.111474-.3054252.166792-.6116896.166792-.917954 0-.6125287-.166792-1.0715057-.500376-1.376931-.305925-.333954-.750144-.5714138-1.334335-.7098621-.555694-.1392873-1.208613-.2223563-1.959595-.250885-.750145-.0276897-1.557284-.041115-2.418064-.041115h-9.714162c.693989-1.6697701 1.584104-3.2975862 2.667832-4.8842873 1.084567-1.6135518 2.210203-3.0467012 3.376908-4.2986092 1.195202-1.2519081 2.362746-2.2537702 3.50263-3.0055862 1.166705-.7509771 2.181705-1.1268851 3.043324-1.1268851.723323 0 1.292427.250046 1.709826.7518161.44422.500931.667168 1.334977.667168 2.5038161 0 .3062644-.028497.6125287-.083815.9187931-.027659.3054253-.041069.6393793-.041069 1.001023 0 .5571494.23552.9741724.708237 1.2527471.471878.250046.986502.375069 1.543034.375069.22211 0 .486127-.0276897.792052-.083069.305925-.083069.611012-.208931.916937-.375908.305925-.1669771.58419-.375069.833959-.6259541.250607-.2785747.417399-.6125287.500376-1.001862.333584-1.4465747.500376-2.7681265.500376-3.9646552 0-1.2527471-.166792-2.3376782-.500376-3.2556322" />
  </svg>
);

export const ReefTestnetLogo = (): JSX.Element => (
  <svg width="113" height="62" viewBox="0 0 113 62" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M99.8204 38.0034C99.1477 38.0034 98.518 38.1442 97.9321 38.4267C97.3464 38.6875 96.8358 39.0466 96.4013 39.5026C95.9674 39.9593 95.6204 40.4914 95.3599 41.0994C95.1211 41.6865 95.002 42.3058 95.002 42.9577C95.002 43.4793 95.0995 43.9792 95.2951 44.4569C95.4902 44.9136 95.7506 45.3152 96.0767 45.6632C96.4235 46.0111 96.8253 46.2824 97.281 46.4776C97.7364 46.6952 98.2254 46.804 98.7457 46.804C99.3754 46.804 99.9716 46.6631 100.537 46.38C101.102 46.1192 101.59 45.7608 102.003 45.3041C102.436 44.8265 102.772 44.2833 103.011 43.6752C103.272 43.0664 103.402 42.4256 103.402 41.7521C103.402 40.6873 103.065 39.7962 102.393 39.0793C101.741 38.3618 100.884 38.0034 99.8204 38.0034Z" fill="url(#paint0_linear_3165_204853)" />
    <path fillRule="evenodd" clipRule="evenodd" d="M65.5013 35.2672C65.7612 34.6584 66.0767 34.0281 66.4452 33.3767C66.8149 32.7025 67.2273 32.0295 67.6828 31.356C68.1607 30.6817 68.6921 30.0842 69.2786 29.5626C69.8859 29.0194 70.5483 28.5849 71.2644 28.2593C71.9804 27.9336 72.7514 27.7705 73.5761 27.7705H73.8693C73.9557 27.7705 74.0526 27.7809 74.1612 27.8025C74.4224 27.8465 74.6502 27.9657 74.8452 28.1616C75.0625 28.357 75.1711 28.6178 75.1711 28.944C75.1711 29.3345 74.9866 29.8024 74.6181 30.345C74.2489 30.8672 73.5761 31.4313 72.5996 32.0401C72.3823 32.1704 72.0026 32.4208 71.4601 32.7896C70.939 33.1592 70.3199 33.572 69.6039 34.0281C68.8878 34.4848 68.1168 34.9631 67.2915 35.4624C66.489 35.9623 65.7075 36.4079 64.9483 36.7991C65.0786 36.3863 65.2631 35.8751 65.5013 35.2672ZM43.5247 33.3767C43.8931 32.7025 44.3056 32.0295 44.7617 31.356C45.2394 30.6817 45.771 30.0842 46.3574 29.5626C46.9648 29.0194 47.6265 28.5849 48.3432 28.2593C49.0599 27.9336 49.8303 27.7705 50.655 27.7705H50.9482C51.0346 27.7705 51.1321 27.7809 51.2407 27.8025C51.5012 27.8465 51.7291 27.9657 51.9247 28.1616C52.142 28.357 52.2506 28.6178 52.2506 28.944C52.2506 29.3345 52.0661 29.8024 51.697 30.345C51.3278 30.8672 50.655 31.4313 49.6778 32.0401C49.4612 32.1704 49.0815 32.4208 48.5383 32.7896C48.0179 33.1592 47.3995 33.572 46.6827 34.0281C45.966 34.4848 45.1963 34.9631 44.371 35.4624C43.6281 35.925 42.9055 36.3358 42.1992 36.7054C42.1685 36.6628 42.1364 36.6209 42.1004 36.5822C42.2248 36.208 42.3793 35.7801 42.5802 35.2672C42.8407 34.6584 43.1555 34.0281 43.5247 33.3767ZM112.255 12.1253C111.995 11.3862 111.647 10.7774 111.213 10.2998C110.801 9.82143 110.312 9.46301 109.749 9.22385C109.206 8.98534 108.631 8.86543 108.023 8.86543C106.721 8.86543 105.353 9.09345 103.921 9.5495C102.51 10.0062 101.055 10.8213 99.5578 11.9942C98.0603 13.1678 96.53 14.7652 94.9671 16.786C93.4256 18.8067 91.8849 21.3707 90.3435 24.4785H86.5015C85.4601 24.4785 84.6676 24.7282 84.1249 25.2282C83.5824 25.7058 83.3107 26.2058 83.3107 26.7273C83.3107 27.2266 83.5281 27.6617 83.962 28.0313C84.3965 28.4008 85.2101 28.5849 86.4039 28.5849H88.1299L84.5307 36.2205C84.3115 36.3351 83.994 36.516 83.5713 36.7663C83.007 37.1142 82.2903 37.5271 81.4224 38.0047C80.5762 38.483 79.6213 38.9935 78.5577 39.5367C77.4941 40.0583 76.3971 40.5477 75.2693 41.0037C74.1612 41.4598 73.0335 41.8405 71.8829 42.1445C70.7545 42.4269 69.6909 42.5685 68.6921 42.5685C67.7588 42.5685 67.01 42.3942 66.4452 42.0469C65.8816 41.6774 65.5452 41.1774 65.4366 40.5477C68.3884 39.4606 70.8409 38.3854 72.7946 37.3206C74.77 36.2342 76.3435 35.18 77.5157 34.1591C78.6879 33.116 79.5126 32.0944 79.9897 31.0952C80.4676 30.0953 80.7064 29.1392 80.7064 28.2265C80.7064 26.6834 80.2613 25.4778 79.3705 24.6083C78.4818 23.7394 77.136 23.305 75.3335 23.305C73.6193 23.305 72.0026 23.5546 70.4822 24.0546C68.9853 24.5545 67.6069 25.217 66.3483 26.0426C65.089 26.8689 63.9495 27.8249 62.9298 28.9113C61.931 29.9761 61.0847 31.0736 60.3896 32.2031C59.6951 33.3328 59.1637 34.4632 58.7946 35.5934C58.4921 36.4996 58.3206 37.3456 58.2657 38.1357C57.4776 38.576 56.6045 39.0427 55.6364 39.5367C54.5728 40.0583 53.4765 40.5477 52.3475 41.0037C51.2407 41.4598 50.1117 41.8405 48.9617 42.1445C47.8333 42.4269 46.7698 42.5685 45.771 42.5685C44.8376 42.5685 44.0888 42.3942 43.5247 42.0469C42.9604 41.6774 42.6241 41.1774 42.5154 40.5477C45.4673 39.4606 47.9204 38.3854 49.8735 37.3206C51.8488 36.2342 53.4222 35.18 54.5944 34.1591C55.7668 33.116 56.5914 32.0944 57.0686 31.0952C57.5463 30.0953 57.7853 29.1392 57.7853 28.2265C57.7853 26.6834 57.3402 25.4778 56.45 24.6083C55.5605 23.7394 54.2149 23.305 52.413 23.305C50.6982 23.305 49.0815 23.5546 47.5618 24.0546C46.0642 24.5545 44.6858 25.217 43.4265 26.0426C42.1685 26.8689 41.0283 27.8249 40.0086 28.9113C39.0098 29.9761 38.1629 31.0736 37.4691 32.2031C36.774 33.3328 36.2425 34.4632 35.8733 35.5934C35.5042 36.7007 35.3203 37.7223 35.3203 38.6567C35.3203 39.2346 35.3648 39.7994 35.4479 40.3531C34.8104 40.7449 34.0925 41.1152 33.275 41.4598C32.0373 41.9814 30.6267 42.2421 29.0422 42.2421H28.5866C28.4341 42.2421 28.2712 42.231 28.0984 42.2094C27.2292 42.1445 26.4051 41.7101 25.6229 40.9054C24.8422 40.1015 24.1255 39.135 23.4742 38.0047C22.8453 36.8534 22.3026 35.6472 21.8465 34.3871C21.4125 33.1048 21.0977 31.9529 20.902 30.932C22.2915 30.6929 23.7243 30.3017 25.2002 29.7585C26.6977 29.2153 28.1527 28.5522 29.5632 27.7705C30.9737 26.9881 32.2984 26.0969 33.5348 25.0971C34.794 24.0762 35.8903 22.9682 36.8237 21.773C37.7564 20.5563 38.4947 19.2634 39.0373 17.894C39.6022 16.5036 39.8836 15.0476 39.8836 13.5262C39.8836 11.2668 39.4169 9.28937 38.4842 7.59426C37.5725 5.89915 36.3348 4.49824 34.7724 3.38957C33.2095 2.25927 31.4076 1.41205 29.3675 0.847228C27.3489 0.282409 25.2329 0 23.0187 0C20.7613 0 18.6236 0.239163 16.6051 0.716835C14.5859 1.17289 12.7192 1.79275 11.0043 2.57445C9.31114 3.33518 7.78089 4.22631 6.41425 5.24784C5.04632 6.24708 3.88521 7.29022 2.92962 8.37662C1.99693 9.46301 1.26977 10.5494 0.748766 11.6358C0.250025 12.7222 0 13.7332 0 14.6676C0 15.6668 0.271624 16.4492 0.813563 17.014C1.35615 17.5572 2.17037 17.8291 3.25557 17.8291C4.05866 17.8291 4.7315 17.6443 5.27409 17.2748C5.81734 16.9052 6.3056 16.4276 6.73955 15.8411C7.1951 15.2541 7.62969 14.5804 8.04204 13.8197C8.45438 13.0589 8.90993 12.2773 9.40932 11.4733C9.93031 10.6687 10.5377 9.88695 11.2329 9.12622C11.9488 8.36548 12.8174 7.69254 13.8371 7.10545C14.8791 6.51835 16.105 6.04068 17.5169 5.67112C18.9489 5.30157 20.6533 5.11678 22.628 5.11678C24.3866 5.11678 25.8947 5.32318 27.1533 5.73664C28.4341 6.14944 29.4761 6.70313 30.2792 7.39899C31.1039 8.09421 31.7008 8.90868 32.07 9.84306C32.4607 10.7774 32.6557 11.7662 32.6557 12.8094C32.6557 14.2653 32.2873 15.7644 31.549 17.3076C30.8322 18.85 29.8447 20.2515 28.5866 21.5122C27.3273 22.7722 25.8515 23.8154 24.1582 24.641C22.4865 25.445 20.7076 25.8474 18.8187 25.8474H18.3624C18.2322 25.8474 18.1026 25.8363 17.9724 25.8145C18.5366 24.6194 19.0791 23.457 19.6002 22.3267C20.1211 21.1755 20.5767 20.1212 20.9674 19.1651C21.3581 18.2092 21.673 17.3619 21.9113 16.6228C22.1508 15.8838 22.2699 15.3084 22.2699 14.8956C22.2699 14.4828 22.2051 14.146 22.0742 13.8853C21.944 13.6028 21.7928 13.3964 21.6187 13.2654C21.4445 13.1134 21.2502 13.0157 21.0329 12.9724C20.8156 12.907 20.631 12.8748 20.4791 12.8748C19.915 12.8748 19.2742 13.2005 18.5582 13.8525C17.8637 14.4828 17.1149 15.3301 16.3118 16.3948C15.5297 17.4596 14.7162 18.6875 13.8698 20.0779C13.0445 21.4468 12.2204 22.8706 11.3952 24.3475L1.79076 41.9486C1.55185 42.4053 1.36728 42.8941 1.23703 43.4157C1.10679 43.9373 1.04199 44.4477 1.04199 44.9476C1.04199 45.2956 1.08519 45.6645 1.17224 46.0557C1.28089 46.4469 1.45433 46.8053 1.69324 47.1316C1.93148 47.4572 2.26855 47.7291 2.70249 47.9461C3.13645 48.1636 3.70063 48.2723 4.39573 48.2723C5.24202 48.2723 6.02352 47.9677 6.73955 47.3596C7.45559 46.7509 8.12909 45.9581 8.75808 44.9805C9.38772 43.9805 9.96305 42.8614 10.4834 41.6229C11.0043 40.3622 11.5038 39.0911 11.9809 37.8095C12.4587 36.5272 12.9044 35.2888 13.3168 34.0935C13.7285 32.8768 14.1303 31.8231 14.5205 30.932C15.2155 33.1919 16.0081 35.3431 16.8976 37.3855C17.7878 39.4063 18.7748 41.1774 19.8607 42.6982C20.9458 44.2197 22.1508 45.4254 23.4742 46.3164C24.7983 47.2075 26.2422 47.6531 27.8045 47.6531C29.7143 47.6531 31.7335 47.1748 33.8607 46.2188C34.8902 45.7503 35.9303 45.1481 36.9801 44.4201C37.1327 44.6476 37.2957 44.867 37.4691 45.0781C38.1852 45.9253 39.0425 46.5989 40.0413 47.0988C41.061 47.5988 42.2221 47.8485 43.5247 47.8485C45.0438 47.8485 46.5852 47.642 48.1475 47.2293C49.7105 46.838 51.2087 46.3381 52.6415 45.73C54.0951 45.1213 55.4623 44.4589 56.7433 43.7414C57.528 43.2965 58.246 42.8692 58.913 42.4552C59.2743 43.434 59.7618 44.3121 60.3896 45.0781C61.1063 45.9253 61.9637 46.5989 62.9619 47.0988C63.9823 47.5988 65.1434 47.8485 66.4452 47.8485C67.9649 47.8485 69.5063 47.642 71.0693 47.2293C72.6316 46.838 74.1298 46.3381 75.5619 45.73C77.0162 45.1213 78.3836 44.4589 79.6644 43.7414C80.3137 43.3731 80.9224 43.016 81.4906 42.6694L76.6367 52.9659C76.3971 53.4658 76.2131 53.9002 76.0829 54.2691C75.9526 54.6609 75.8878 54.9978 75.8878 55.2801C75.8878 55.845 76.094 56.2578 76.5058 56.5186C76.9187 56.7794 77.3854 56.9097 77.9064 56.9097C78.2755 56.9097 78.6768 56.8226 79.1107 56.6489C79.5453 56.497 79.9681 56.2689 80.3804 55.9643C80.7935 55.6602 81.1731 55.2913 81.52 54.8563C81.8675 54.4434 82.1607 53.9874 82.3989 53.4874C82.7466 52.7923 83.2027 51.8467 83.767 50.6516C84.3311 49.478 84.9608 48.1636 85.6553 46.7077C86.3496 45.23 87.0768 43.6765 87.8367 42.0469C88.6182 40.3951 89.3885 38.7654 90.1485 37.1575C90.93 35.5496 91.6675 34.0176 92.362 32.5616C93.0788 31.084 93.7188 29.7913 94.283 28.6832H97.1158H99.9485C100.903 28.661 101.88 28.6394 102.878 28.6178C103.899 28.5961 104.973 28.5633 106.102 28.52C106.688 28.4762 107.165 28.3897 107.534 28.2593C107.904 28.1073 108.186 27.9336 108.381 27.7377C108.598 27.5201 108.75 27.2922 108.837 27.053C108.924 26.8144 108.967 26.5753 108.967 26.3361C108.967 25.8579 108.837 25.4994 108.576 25.2609C108.338 25.0001 107.991 24.8147 107.534 24.7066C107.1 24.5978 106.591 24.5329 106.004 24.5107C105.418 24.4891 104.788 24.4785 104.116 24.4785H96.53C97.072 23.1746 97.767 21.9035 98.6133 20.6644C99.4603 19.4043 100.339 18.2852 101.25 17.3076C102.184 16.33 103.095 15.5476 103.986 14.9605C104.897 14.3741 105.689 14.0805 106.362 14.0805C106.927 14.0805 107.371 14.2758 107.697 14.6676C108.044 15.0588 108.218 15.7101 108.218 16.6228C108.218 16.862 108.196 17.1011 108.153 17.3403C108.131 17.5789 108.121 17.8397 108.121 18.1221C108.121 18.5572 108.305 18.8828 108.674 19.1004C109.043 19.2956 109.444 19.3932 109.879 19.3932C110.053 19.3932 110.259 19.3716 110.498 19.3283C110.737 19.2634 110.974 19.1651 111.213 19.0348C111.452 18.9044 111.669 18.7419 111.865 18.5459C112.061 18.3284 112.191 18.0676 112.255 17.7637C112.516 16.634 112.647 15.602 112.647 14.6676C112.647 13.6893 112.516 12.8421 112.255 12.1253Z" fill="#6A27EA" />
    <path d="M3.63846 54.8598V53.8829H2.18024V52H0.991021V53.8829H0V54.8598H0.991021V59.7441C0.991021 60.8484 1.65642 61.3298 2.63328 61.3298C2.97306 61.3298 3.36947 61.2731 3.6243 61.0749V60.1264C3.35531 60.2255 3.12879 60.2538 2.9589 60.2538C2.40676 60.2538 2.18024 59.9706 2.18024 59.5176V54.8598H3.63846Z" fill="#6A27EA" />
    <path d="M8.27071 53.7414C6.41608 53.7414 4.60393 55.0863 4.60393 57.5639C4.60393 60.0131 6.40193 61.3864 8.38397 61.3864C9.57319 61.3864 10.635 60.905 11.3004 60.0839L10.7058 59.4751C10.1678 60.0556 9.37499 60.367 8.51138 60.367C7.09564 60.367 5.92057 59.5459 5.73653 58.0028H11.7959C12.0932 55.0863 10.1395 53.7414 8.27071 53.7414ZM8.28486 54.7749C9.51656 54.7749 10.6633 55.5818 10.7483 57.0967H5.73653C5.92057 55.5535 7.06733 54.7749 8.28486 54.7749Z" fill="#6A27EA" />
    <path d="M15.1152 61.3864C16.446 61.3864 17.6777 60.7068 17.6777 59.2486C17.6777 58.0311 16.8282 57.5214 15.6673 57.0684L15.0727 56.8277C14.3082 56.5162 14.0109 56.1481 14.0109 55.6809C14.0109 55.058 14.5206 54.7182 15.1576 54.7182C15.8089 54.7182 16.2478 55.058 16.4743 55.6668L17.4228 55.3836C17.168 54.3926 16.2902 53.7414 15.1152 53.7414C13.841 53.7414 12.8358 54.5059 12.8358 55.6668C12.8358 56.5021 13.3455 57.2241 14.563 57.7196L15.2284 57.9744C16.0779 58.3284 16.5026 58.6398 16.5026 59.2486C16.5026 60.0556 15.8089 60.3954 15.1152 60.3954C14.294 60.3954 13.7136 59.8998 13.5154 59.1212L12.5244 59.3902C12.7509 60.6502 13.7419 61.3864 15.1152 61.3864Z" fill="#6A27EA" />
    <path d="M22.1371 54.8598V53.8829H20.6789V52H19.4897V53.8829H18.4987V54.8598H19.4897V59.7441C19.4897 60.8484 20.1551 61.3298 21.132 61.3298C21.4717 61.3298 21.8681 61.2731 22.123 61.0749V60.1264C21.854 60.2255 21.6275 60.2538 21.4576 60.2538C20.9054 60.2538 20.6789 59.9706 20.6789 59.5176V54.8598H22.1371Z" fill="#6A27EA" />
    <path d="M27.1783 53.7414C25.9041 53.7414 25.0971 54.3784 24.7149 55.0863V53.8829H23.5257V61.2448H24.7149V57.0825C24.7149 55.596 25.6351 54.8315 26.8102 54.8315C27.9853 54.8315 28.863 55.596 28.863 57.0825V61.2448H30.0523V56.9126C30.0523 54.7041 28.7215 53.7414 27.1783 53.7414Z" fill="#6A27EA" />
    <path d="M35.0371 53.7414C33.1825 53.7414 31.3703 55.0863 31.3703 57.5639C31.3703 60.0131 33.1683 61.3864 35.1504 61.3864C36.3396 61.3864 37.4014 60.905 38.0668 60.0839L37.4722 59.4751C36.9342 60.0556 36.1414 60.367 35.2778 60.367C33.862 60.367 32.687 59.5459 32.5029 58.0028H38.5623C38.8596 55.0863 36.9059 53.7414 35.0371 53.7414ZM35.0513 54.7749C36.283 54.7749 37.4297 55.5818 37.5147 57.0967H32.5029C32.687 55.5535 33.8337 54.7749 35.0513 54.7749Z" fill="#6A27EA" />
    <path d="M43 54.8598V53.8829H41.5418V52H40.3526V53.8829H39.3615V54.8598H40.3526V59.7441C40.3526 60.8484 41.018 61.3298 41.9948 61.3298C42.3346 61.3298 42.731 61.2731 42.9858 61.0749V60.1264C42.7169 60.2255 42.4903 60.2538 42.3204 60.2538C41.7683 60.2538 41.5418 59.9706 41.5418 59.5176V54.8598H43Z" fill="#6A27EA" />
    <defs>
      <linearGradient id="paint0_linear_3165_204853" x1="99.202" y1="38.0034" x2="99.202" y2="46.804" gradientUnits="userSpaceOnUse">
        <stop stopColor="#681CFF" />
        <stop offset="1" stopColor="#FD3F83" />
      </linearGradient>
    </defs>
  </svg>
);

export const WalletIcon = (): JSX.Element => (
  <svg version="1.1" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="10 0 100 125" height="1.5em" width="1.5em">
    <g>
      <path
        d="M63.02,59.188c-6.502,0-11.792-5.29-11.792-11.792V37.208c0-6.501,5.29-11.791,11.792-11.791h4.76   c0.109-0.007,0.221-0.011,0.334-0.011h20.102v-5.365c0,0,0-6.791-6.792-6.791H13.507c-3.749,0-6.792,3.044-6.792,6.791v59.917   c0,3.747,3.043,6.792,6.792,6.792h67.916c6.792,0,6.792-6.792,6.792-6.792V59.188H63.02z"
      />
      <path
        d="M91.186,30.419v-0.002H91.17c-0.03-0.001-0.052-0.011-0.083-0.011H68.113c-0.037,0-0.07,0.009-0.106,0.011H63.02   c-3.749,0-6.792,3.043-6.792,6.791v10.188c0,3.747,3.043,6.792,6.792,6.792h28.166v-0.014c2.088-0.072,2.1-2.186,2.1-2.186V32.604   C93.285,32.604,93.273,30.491,91.186,30.419z M65.86,46.143c-2.121,0-3.841-1.72-3.841-3.841c0-2.12,1.72-3.84,3.841-3.84   c2.119,0,3.84,1.721,3.84,3.84C69.7,44.422,67.979,46.143,65.86,46.143z"
      />
    </g>
  </svg>
);

export const SendIcon = () : JSX.Element => (
  <svg version="1.1" x="0px" y="0px" viewBox="0 -15 100 125">
    <g><path d="M61.2,74.1v-0.6H93c0.2,0,0.4-0.2,0.4-0.4L88.6,5.4c0-0.3-0.4-0.5-0.6-0.3L7.1,75.8c-0.4,0.3-0.1,1,0.4,1l32.9,0.1   c0.1,0,0.2,0.1,0.3,0.1L57,94.9c0.2,0.2,0.5,0.1,0.6-0.1l8.3-20.2c0.1-0.1,0.1-0.4,0-0.4 M54.5,71.6c0,0.1-0.1,0.3-0.1,0.4   l1.1,12.6c0,0.4-0.4,0.6-0.7,0.3L44,72.8c-0.1-0.1-0.1-0.3,0-0.5l35.4-51.6c0.3-0.4,0.9,0,0.7,0.4L54.5,71.6z" /></g>
  </svg>
);

export const RIcon = () : JSX.Element => (
  <svg viewBox="0 0 55 63">
    <path
      d="M322.80306 311.032994h.578518c2.398023 0 4.658898-.515895 6.780962-1.548527 2.150325-1.060405 4.02469-2.400218 5.623927-4.018597 1.598405-1.619221 2.852692-3.419384 3.762029-5.400489.937598-1.981946 1.406397-3.907506 1.406397-5.777521 0-1.339813-.24853-2.609773-.744759-3.809882-.467968-1.200108-1.226857-2.246206-2.274174-3.139134-1.019887-.893769-2.343164-1.605755-3.968999-2.135957-1.599237-.530203-3.515162-.795304-5.747776-.795304-2.507742 0-4.672198.237329-6.490872.711986-1.792076.474657-3.349752 1.088177-4.672198 1.842242-1.295847.753224-2.398855 1.61838-3.308192 2.595467-.881907.976245-1.654096 1.981105-2.315734 3.013737-.634209 1.032632-1.212727 2.037491-1.736385 3.014578-.523659.976246-1.074747 1.842243-1.654096 2.595466-.551089.753224-1.171167 1.367586-1.860235 1.842243-.689068.474657-1.543546.711144-2.563433.711144-1.378967 0-2.412154-.348418-3.101222-1.046097-.689068-.725452-1.034018-1.730311-1.034018-3.014579 0-1.199267.316689-2.497842.950897-3.893199.661639-1.395358 1.585106-2.790716 2.770403-4.186073 1.213558-1.395358 2.687283-2.735171 4.424499-4.019438 1.736386-1.311199 3.679741-2.455762 5.829234-3.432849 2.178586-1.00486 4.54918-1.800163 7.112613-2.385911 2.563433-.614361 5.278145-.9207 8.144968-.9207 2.811963 0 5.499246.362726 8.06351 1.088177 2.590863.725451 4.878336 1.813628 6.863252 3.265373 1.984915 1.42313 3.55589 3.223293 4.713758 5.400488 1.185297 2.176354 1.777945 4.716276 1.777945 7.618922 0 1.953333-.358249 3.824189-1.074747 5.610045-.689899 1.758084-1.626666 3.419384-2.811963 4.982218-1.185297 1.53422-2.577564 2.958192-4.175969 4.269391-1.570976 1.284267-3.252501 2.428831-5.044577 3.432849-1.792076 1.00486-3.63818 1.856549-5.540806 2.554228-1.874365.697679-3.693871 1.200109-5.457686 1.50729.247699 1.311198.647508 2.790715 1.198597 4.437708.579349 1.61838 1.268417 3.167748 2.068035 4.646424.827048 1.451744 1.736385 2.69309 2.728843 3.725722.992458 1.032632 2.039775 1.591449 3.141951 1.674766.2211.027773.427239.04208.62091.04208h.578518c2.012344 0 3.803589-.334953 5.375396-1.00486 1.570975-.669906 2.880122-1.409664 3.927439-2.218433 1.240987-.921542 2.315734-1.995412 3.225071-3.224135.855309-.976245 1.723086-1.46521 2.605825-1.46521.551088 0 1.019887.195249 1.405566.586589.385679.390498.578518.920701.578518 1.590607 0 .642134-.20697 1.395358-.620078 2.260513-.385679.837383-1.061448 1.716004-2.026476 2.637546-2.838561 2.707398-5.623095 4.688503-8.351938 5.944998-2.701413 1.227881-5.264846 1.842242-7.690299 1.842242-1.984915 0-3.81772-.573123-5.499246-1.716845-1.681526-1.144564-3.211772-2.693091-4.589908-4.647265-1.378137-1.953332-2.632424-4.228153-3.762861-6.823619-1.129606-2.623239-2.136194-5.386181-3.018102-8.288828-.496229 1.143722-1.005757 2.497841-1.529415 4.060676-.52449 1.535061-1.088877 3.125668-1.695656 4.772661-.605948 1.646152-1.240988 3.278839-1.901795 4.898059-.661638 1.590607-1.392267 3.028044-2.191885 4.312312-.799618 1.255654-1.653265 2.273979-2.563433 3.055816-.909337.780997-1.901795 1.171495-2.976542 1.171495-.882739 0-1.599236-.138862-2.150325-.418271-.551088-.279408-.978327-.627826-1.281716-1.046097-.30339-.419112-.523659-.879463-.661639-1.381892-.11055-.50243-.165409-.977087-.165409-1.423131 0-.642133.082289-1.297733.24853-1.967639.164578-.669906.398978-1.297733.702367-1.884322l12.197919-22.606814c1.047317-1.897788 2.094634-3.725723 3.141951-5.483806 1.074747-1.785856 2.108765-3.362997 3.101222-4.730583 1.019888-1.367585 1.970785-2.455762 2.853524-3.265372.909337-.837383 1.722255-1.256495 2.438752-1.256495.19284 0 .427239.042079.703199.125397.275129.056386.523659.181783.743928.377032.220269.167477.413939.432578.579349.795304.165409.334953.247699.768372.247699 1.297733 0 .531044-.15128 1.26996-.454669 2.219275-.303389.949315-.703199 2.037492-1.198596 3.265373-.49706 1.227881-1.075578 2.581159-1.737217 4.060676-.661638 1.450902-1.350706 2.944726-2.067204 4.479788.16541.027772.330819.041238.496229.041238z"
      transform="translate(-299 -277)"
      fillRule="evenodd"
    />
  </svg>
);

export const SwapIcon = (): JSX.Element => (
  <svg strokeWidth="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" /></svg>
);

export default Object.freeze({
  en: {
    app: {
      bookingFor: 'The booking for {name}, booking № {orderId}, referer: {referer}',
      earlyCheckInWarning: 'You can register ONLY 4 days before ARRIVAL. You can register from {date}',
    },
    common: {
      back: 'Back',
      next: 'Next step',
      exit: 'Exit',
      error: 'An error occurred please contact support',
      close: 'Close',
      cancel: 'Cancel',
      done: 'Done',
    },
    selectBooking: {
      haveBooking: 'I have a booking',
      checkOut: 'Check out',
      wantToBook: 'I want to book'
    },
    confirmation: {
      search: 'Search',
      information: 'Information',
      rules: 'Rules',
      documents: 'Documents',
      payment: 'Payment',
      checkInDetails: 'CheckIn Details',
    },
    instruction: {
      register: 'You should register your guests',
      pay: 'and pay the city tax',
      warning: 'Please pay attention. Your check-in is not today.',
    },
    payment: {
      debt: 'Your debt is {debt} €',
      charges: 'Charges',
      payments: 'Payments',
      cash: 'I can\'t pay by Card',
      success: 'Thank you for your payment. You can go to the next step',
      pay: 'Pay',
      total: 'Total',
      cashAgree: 'I am agree',
      disagree: 'I am disagree with payment',
      disagreeHeader: 'Payment disagree',
      payByCash: 'Payment by cash',
      cancelAgree: 'I am agree',
      qrcode: 'You can scan the QR-code to continue on your smartphone',
      details: 'Payment details for {orderId}',
    },
    photos: {
      takePhoto: 'Take photo',
      remove: 'Remove',
      upload: 'Upload',
      makePhotoTitle: 'Make photos of yours Passports or Card IDs',
      switch: 'Switch the camera',
    },
    search: {
      property: 'Property',
      room: 'Room',
      checkIn: 'Check-in',
      checkOut: 'Check-out',
      originalReferer: 'Original Referer',
      label: 'Enter the surname who has created the booking or order number',
      choose: 'Choose your Booking',
      restriction: 'Registration is open 4 days before check-in only',
    },
    bookingInfo: {
      header: 'Details about your reservation',
      roomNumber: 'Room Number',
      checkIn: 'CheckIn',
      checkOut: 'CheckOut',
      fullName: 'Full Name',
      originalReferer: 'Original Referer',
      smartLockCode: 'Smart Lock Code',
      call: 'Phone us',
      rules: 'Rules',
      howToMakeIn: 'How to make in',
      facilities: 'Facilities',
      extras: 'Extras',
      debt: 'Debt',
      photoDocuments: 'You can add photos of your ID or passport',
      payDebt: 'Pay your debt',
    },
    checkInDetails: {
      email: 'Please input your e-mail',
      invalidEmail: 'Invalid Email',
      sent: 'Information has been sent to {email}',
      information: 'Check-in information',
      askQuestion: 'Ask a question',
      feedback: 'Send Feedback',
      sendToEmail: 'Send this information to my email address',
    },
    checkout: {
      search: 'Search',
      checkOutDetails: 'CheckOut Details',
    },
    checkOutDetails: {
      askQuestion: 'Ask a question',
      feedback: 'Send Feedback',
      checkedOut: 'I am checked out',
    },
    feedback: {
      sent: 'Your messge has been sent',
      validation: 'Message can not be empty',
    },
    rules: {
      header: 'Living Rules',
      agree: 'I am agree',
    },
    tax: {
      guestLimit: 'We can\'t revive guest more than {limit} guests',
      extraGuest: 'You will be required to pay for an additional guest',
      lessDocs: 'Don\'t forget to add a document for each guest',
      makePhoto: 'Make a photo',
    },
    guide: {
      p0: 'Below are the requirements for the size and quality of document images for successful image processing:',
      p1: {
        title: 'Foreign objects and distortions',
        body: 'Ensure that your hands or other objects do not cover the document data. When scanning a passport, ensure that the pages are aligned correctly and all data is clearly visible.',
      },
      p2: {
        title: 'Good lighting',
        body: 'Good lighting helps achieve better OCR results. If the image is too dark or too bright, the document may not be processed correctly.',
      },
      p3: {
        title: 'Avoid reflections',
        body: 'Glare and reflections interfere with processing and reduce data extraction accuracy. We recommend not using the mobile device\'s flash when taking pictures of documents.',
      },
      p4: {
        title: 'Focus and sharpness',
        body: 'Ensure that the image is clear and has no blurred areas.',
      },
      p5: {
        title: 'Angle',
        body: 'The tilt of the document should not exceed 10 degrees in any direction (horizontal or vertical).',
      },
      p6: {
        title: 'Margins (too small)',
        body: 'Make sure there is minimal space around the document. It is recommended that the document occupy 70-80% of the image.',
      },
      p7: {
        title: 'Margins (too large)',
        body: 'Ensure that the space around the document does not occupy more than 20-30% of the image. It is recommended that the document occupy 70-80% of the image.',
      },
      p8: {
        title: 'Contrast',
        body: 'The document should contrast clearly with the background. A light document on a light background or a dark document on a dark background may not be recognized.',
      },
      p9: {
        title: 'Image resolution',
        body: 'To achieve good quality document recognition, it is recommended to provide images taken with a camera with a resolution of at least Full HD (1920×1080) and autofocus.',
      }
    },
    documents: {
      mandatory: 'You are required to register all guests prior to check-in for booking {id}',
      requirement: 'Only a passport or ID is required for scanning',
      duplicateGuest: 'You have already added a document for this guest',
      guests: 'Registered guests',
      recognizeError: 'We are unable to recognize the document. Pleas complete the form below',
      recognizeWarning: 'We are unable to recognize the document. Please check the photo and try again',
    },
    guest: {
      firstName: 'First name',
      lastName: 'Last name',
      dateOfBirth: 'Date of birth',
      pickADate: 'Pick a date',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      nationality: 'Nationality',
      documentType: 'Document type',
      passport: 'Passport',
      id: 'Id',
      documentNumber: 'Document number',
      add: 'Add',
    }
  },
  ru: {
    common: {
      back: 'Назад',
      next: 'Следующий шаг',
      exit: 'Выход',
      error: 'Произошла ошибка, обратитесь в службу поддержки',
      close: 'Закрыть',
      cancel: 'Отмена',
      done: 'Сделанный',
    },
    selectBooking: {
      haveBooking: 'У меня есть бронирование',
      checkOut: 'Выезд',
      wantToBook: 'Хочу сделать бронирование'
    },
    confirmation: {
      search: 'Поиск',
      information: 'Информация',
      rules: 'Правила',
      payment: 'Оплата',
      checkInDetails: 'Детали регистрации',
    },
    instruction: {
      register: 'Вы должны зарегистрировать своих гостей',
      pay: 'и заплатить городской налог',
    },
    payment: {
      debt: 'Ваш долг {debt} €',
      cash: 'Не могу оплатить картой',
      success: 'Спасибо вам за ваш платеж. Вы можете перейти к следующему шагу',
      pay: 'Платить',
    },
    photos: {
      takePhoto: 'Сделать фотографию',
      remove: 'Удалить',
      upload: 'Загрузить',
    },
    search: {
      property: 'Отель',
      room: 'Комната',
      checkIn: 'Заезд',
      checkOut: 'Выезд',
      originalReferrer: 'Оригинальный реферер',
      label: 'Введите фамилию создателя бронирования или номер заказа',
      choose: 'Выберите свое бронирование',
      restriction: 'Регистрация открыта только за 4 дня до заезда',
    },
    bookingInfo: {
      header: 'Детали о вашем бронировании',
      roomNumber: 'Номер комнаты',
      checkIn: 'Заезд',
      checkOut: 'Выезд',
      fullName: 'Полное имя',
      originalReferrer: 'Оригинальный реферер',
      smartLockCode: 'Код на замок',
      call: 'Позвоните нам',
      rules: 'Правила',
      howToMakeIn: 'Как сделать в',
      facilities: 'Удобства',
      extras: 'Дополнительно',
    },
    checkInDetails: {
      email: 'Пожалуйста, введите свой адрес электронной почты',
      invalidEmail: 'Неверный адрес электронной почты',
      sent: 'Информация отправлена на {email}',
      information: 'Информация о регистрации',
      askQuestion: 'Задайте вопрос',
      feedback: 'Отправить отзыв',
      sendToEmail: 'Отправить эту информацию на мой адрес электронной почты',
    },
    checkout: {
      search: 'Поиск',
      checkOutDetails: 'Детали оформления заказа',
    },
    checkOutDetails: {
      askQuestion: 'Задайте вопрос',
      feedback: 'Отправить отзыв',
    },
    feedback: {
      sent: 'Ваше сообщение отправлено',
    },
    rules: {
      header: 'Правила проживания',
      agree: 'я согласен',
    },
    tax: {
      guestLimit: 'Мы не можем принять больше гостей, чем {limit}',
      extraGuest: 'Вам необходимо будет заплатить за дополнительного гостя',
      lessDocs: 'Не забудьте добавить фото на документ для каждого гостя',
      makePhoto: 'Сделай фото',
      total: 'Общий налог: {total} €',
      makePhotoTitle: 'Сфотографируйте свои паспорта или удостоверения личности',
    },
    guide: {
      p0: 'Ниже приведены требования к размеру и качеству изображений документов для успешной обработки изображений:',
      p1: {
        title: 'Посторонние предметы и искажения',
        body: 'Убедитесь, что ваши руки или другие предметы не закрывают данные документа. При сканировании паспорта убедитесь, что страницы правильно выровнены и все данные четко видны.',
      },
      p2: {
        title: 'Хорошее освещение.',
        body: 'Хорошее освещение помогает достичь лучших результатов OCR. Если изображение слишком темное или слишком яркое, документ может быть обработан некорректно.',
      },
      p3: {
        title: 'Избегайте отражений',
        body: 'Блики и отражения мешают обработке и снижают точность извлечения данных. Мы рекомендуем не использовать вспышку мобильного устройства при съемке изображений документов.',
      },
      p4: {
        title: 'Фокус и резкость',
        body: 'Убедитесь, что изображение четкое и на нем нет размытых участков.',
      },
      p5: {
        title: 'Угол',
        body: 'Угол наклона документа не должен превышать 10 градусов в любом направлении (горизонтальном или вертикальном).',
      },
      p6: {
        title: 'Поля (слишком малы)',
        body: 'Убедитесь, что вокруг документа есть минимальное пространство. Рекомендуется, чтобы документ занимал 70-80% изображения.',
      },
      p7: {
        title: 'Поля (слишком большие)',
        body: 'Убедитесь, что пространство вокруг документа не занимает более 20-30% изображения. Рекомендуется, чтобы документ занимал 70-80% изображения.',
      },
      p8: {
        title: 'Контраст',
        body: 'Документ должен четко контрастировать с фоном. Светлый документ на светлом фоне, а также темный документ на темном фоне могут быть не распознаны.',
      },
      p9: {
        title: 'Разрешение изображения',
        body: 'Для достижения хорошего качества распознавания документов, удостоверяющих личность, рекомендуем предоставлять изображения, снятые камерой с разрешением не менее Full HD (1920×1080) и автофокусом.',
      },
    },
  },
  zh: {
    common: {
      back: '后退',
      next: '下一步',
      exit: '出口',
      error: '发生错误，请联系支持人员',
      close: '关闭',
      cancel: '取消',
      done: '完毕',
    },
    selectBooking: {
      haveBooking: '我有预订',
      checkOut: '查看',
      wantToBook: '我要预订'
    },
    confirmation: {
      search: '搜索',
      information: '信息',
      rules: '规则',
      payment: '支付',
      checkInDetails: '入住详情',
    },
    instruction: {
      register: '你应该登记你的客人',
      pay: '并缴纳城市税',
    },
    payment: {
      debt: '你的债务是 {debt} €',
      cash: '我不能用卡支付',
      success: '谢谢您的付款。 您可以进入下一步',
      pay: '支付',
    },
    photos: {
      takePhoto: '拍照',
      remove: '消除',
      upload: '上传',
    },
    search: {
      property: '财产',
      room: '房间',
      checkIn: '报到',
      checkOut: '查看',
      originalReferrer: '原始推荐人',
      label: '输入创建预订或订单号的姓氏',
      choose: '选择您的预订',
      restriction: '登记仅在入住前 4 天开放',
    },
    bookingInfo: {
      header: '关于您的预订的详细信息',
      roomNumber: '房间号',
      checkIn: '报到',
      checkOut: '查看',
      fullName: '全名',
      originalReferrer: '原始推荐人',
      smartLockCode: '智能锁密码',
      call: '给我们打电话',
      rules: '规则',
      howToMakeIn: '如何制作',
      facilities: '设施',
      extras: '附加功能',
    },
    checkInDetails: {
      email: '请输入您的电子邮箱',
      invalidEmail: '不合规电邮',
      sent: '信息已发送至{email}',
      information: '入住信息',
      askQuestion: '问一个问题',
      feedback: '发送反馈',
      sendToEmail: '将此信息发送到我的电子邮件地址',
    },
    checkout: {
      search: '搜索',
      checkOutDetails: '结帐详情',
    },
    checkOutDetails: {
      askQuestion: '问一个问题',
      feedback: '发送反馈',
    },
    feedback: {
      sent: '您的留言已发送',
    },
    rules: {
      header: '生活规则',
      agree: '我同意',
    },
    tax: {
      guestLimit: '我们不能审查超过 {limit} 名客人',
      extraGuest: '您将需要为额外的客人付费',
      lessDocs: '不要忘记为每位客人添加证件照片',
      makePhoto: '拍张照片',
    },
    guide: {
      p0: '以下是成功处理图像的文档图像大小和质量要求：',
      p1: {
        title: '外来物品和失真',
        body: '确保您的手或其他物品不会遮挡文件数据。扫描护照时，请确保页面对齐正确，所有数据清晰可见。',
      },
      p2: {
        title: '良好的照明',
        body: '良好的照明有助于获得更好的OCR结果。如果图像太暗或太亮，文件可能无法正确处理。',
      },
      p3: {
        title: '避免反射',
        body: '眩光和反射会干扰处理并降低数据提取准确性。我们建议在拍摄文档图片时不要使用手机闪光灯。',
      },
      p4: {
        title: '对焦和清晰度',
        body: '确保图像清晰且没有模糊区域。',
      },
      p5: {
        title: '角度',
        body: '文件的倾斜角度在任何方向（水平或垂直）不得超过10度。',
      },
      p6: {
        title: '边距（太小）',
        body: '确保文件周围有最小空间。建议文件占图像的70-80%。',
      },
      p7: {
        title: '边距（太大）',
        body: '确保文件周围的空间不超过图像的20-30%。建议文件占图像的70-80%。',
      },
      p8: {
        title: '对比度',
        body: '文件应与背景有明显的对比。浅色文件放在浅色背景上，深色文件放在深色背景上，可能无法识别。',
      },
      p9: {
        title: '图像分辨率',
        body: '为了获得良好的文件识别质量，建议提供使用分辨率至少为Full HD（1920×1080）且具有自动对焦的相机拍摄的图像。',
      }
    },
  },
  hr: {
    common: {
      back: 'leđa',
      next: 'Sljedeći korak',
      exit: 'Izlaz ',
      error: 'Došlo je do pogreške, obratite se podršci',
      close: 'Zatvoriti',
      cancel: 'Otkazati',
      done: 'Gotovo',
    },
    selectBooking: {
      haveBooking: 'Imam rezervaciju',
      checkOut: 'Check out',
      wantToBook: 'Želim rezervirati'
    },
    confirmation: {
      search: 'Traži',
      information: 'Informacija',
      rules: 'Pravila',
      payment: 'Plaćanje',
      checkInDetails: 'Detalji prijave',
    },
    instruction: {
      register: 'Trebali biste prijaviti svoje goste',
      pay: 'i platiti gradski porez',
    },
    payment: {
      debt: 'Vaš dug je {debt} €',
      cash: 'Ne mogu platiti karticom',
      success: 'Hvala na Vašoj uplati. Možete prijeći na sljedeći korak',
      pay: 'Platiti',
    },
    photos: {
      takePhoto: 'Uslikaj',
      remove: 'Ukloniti',
      upload: 'Učitaj',
    },
    search: {
      property: 'Hotel',
      room: 'Soba',
      checkIn: 'Prijava',
      checkOut: 'Check-out',
      originalReferrer: 'Izvorna preporuka',
      label: 'Unesite prezime osobe koja je kreirala broj rezervacije ili narudžbe',
      choose: 'Odaberite svoju rezervaciju',
      restriction: 'Prijave su otvorene samo 4 dana prije dolaska',
    },
    bookingInfo: {
      header: 'Detalji o Vašoj rezervaciji',
      roomNumber: 'Broj sobe',
      checkIn: 'Prijava',
      checkOut: 'CheckOut',
      fullName: 'Puno ime',
      originalReferrer: 'Izvorna preporuka',
      smartLockCode: 'Smart Lock kod',
      call: 'Nazovite nas',
      rules: 'Pravila',
      howToMakeIn: 'Kako napraviti u',
      facilities: 'Objekti',
      extras: 'Dodaci',
    },
    checkInDetails: {
      email: 'Molimo unesite svoju e-poštu',
      invalidEmail: 'Nevažeći email',
      sent: 'Informacije su poslane na {email}',
      information: 'Informacije o prijavi',
      askQuestion: 'Pitati pitanje',
      feedback: 'Pošalji povratne informacije',
      sendToEmail: 'Pošaljite ovu informaciju na moju e-mail adresu',
    },
    checkout: {
      search: 'Traži',
      checkOutDetails: 'Detalji naplate',
    },
    checkOutDetails: {
      askQuestion: 'Pitati pitanje',
      feedback: 'Pošalji povratne informacije',
    },
    feedback: {
      sent: 'Vaša poruka je poslana',
    },
    rules: {
      header: 'Životna pravila',
      agree: 'slažem se',
    },
    tax: {
      guestLimit: 'Ne možemo oživjeti više od {limit} gostiju',
      extraGuest: 'Za dodatnog gosta morat ćete platiti',
      lessDocs: 'Ne zaboravite dodati fotografiju dokumenta za svakog gosta',
      makePhoto: 'Napravi fotografiju',
    },
    guide: {
      p0: 'Ispod su zahtjevi za veličinu i kvalitetu slika dokumenata za uspješnu obradu slika:',
      p1: {
        title: 'Strani predmeti i izobličenja',
        body: 'Pobrinite se da vaše ruke ili drugi predmeti ne prekrivaju podatke na dokumentu. Prilikom skeniranja putovnice pobrinite se da su stranice pravilno poravnate i svi podaci jasno vidljivi.',
      },
      p2: {
        title: 'Dobro osvjetljenje',
        body: 'Dobro osvjetljenje pomaže u postizanju boljih OCR rezultata. Ako je slika previše tamna ili previše svijetla, dokument može biti pogrešno obrađen.',
      },
      p3: {
        title: 'Izbjegavajte refleksije',
        body: 'Odsjaji i refleksije ometaju obradu i smanjuju točnost ekstrakcije podataka. Preporučujemo da ne koristite bljeskalicu mobilnog uređaja prilikom snimanja slika dokumenata.',
      },
      p4: {
        title: 'Fokus i oštrina',
        body: 'Pobrinite se da slika bude jasna i da nema zamućenih dijelova.',
      },
      p5: {
        title: 'Kut',
        body: 'Kut nagiba dokumenta ne smije biti veći od 10 stupnjeva u bilo kojem smjeru (horizontalno ili vertikalno).',
      },
      p6: {
        title: 'Margine (previše male)',
        body: 'Pobrinite se da oko dokumenta bude minimalan prostor. Preporučuje se da dokument zauzima 70-80% slike.',
      },
      p7: {
        title: 'Margine (previše velike)',
        body: 'Pobrinite se da prostor oko dokumenta ne zauzima više od 20-30% slike. Preporučuje se da dokument zauzima 70-80% slike.',
      },
      p8: {
        title: 'Kontrast',
        body: 'Dokument mora jasno kontrastirati s pozadinom. Svijetli dokument na svijetloj pozadini ili tamni dokument na tamnoj pozadini možda neće biti prepoznati.',
      },
      p9: {
        title: 'Rezolucija slike',
        body: 'Za postizanje dobre kvalitete prepoznavanja dokumenata, preporučujemo pružanje slika snimljenih kamerom s rezolucijom od najmanje Full HD (1920×1080) i automatskim fokusom.',
      }
    }
  },
  fr: {
    common: {
      back: 'Dos',
      next: 'L\'étape suivante',
      exit: 'Sortie',
      error: 'Une erreur s\'est produite, veuillez contacter le support',
      close: 'Fermer',
      cancel: 'Annuler',
      done: 'Fait',
    },
    selectBooking: {
      haveBooking: 'j\'ai une réservation',
      checkOut: 'Vérifier',
      wantToBook: 'je veux réserver'
    },
    confirmation: {
      search: 'Recherche',
      information: 'Information',
      rules: 'Règles',
      payment: 'Paiement',
      checkInDetails: 'Détails de l\'enregistrement',
    },
    instruction: {
      register: 'Vous devez inscrire vos invités',
      pay: 'et payer la taxe de séjour',
    },
    payment: {
      debt: 'Votre dette est {debt} €',
      cash: 'Je ne peux pas payer par carte',
      success: 'Merci pour votre paiement. Vous pouvez passer à l\'étape suivantep',
      pay: 'Payer',
    },
    photos: {
      takePhoto: 'Prendre une photo',
      remove: 'Retirer',
      upload: 'Télécharger',
    },
    search: {
      property: 'Propriété',
      room: 'Chambre',
      checkIn: 'Enregistrement',
      checkOut: 'Vérifier',
      originalReferrer: 'Référent d\'origine',
      label: 'Entrez le nom de famille qui a créé le numéro de réservation ou de commande',
      choose: 'Choisissez votre réservation',
      restriction: 'L\'inscription est ouverte 4 jours avant l\'enregistrement uniquement',
    },
    bookingInfo: {
      header: 'Détails sur votre réservation',
      roomNumber: 'Numéro de chambre',
      checkIn: 'Enregistrement',
      checkOut: 'Vérifier',
      fullName: 'Nom et prénom',
      originalReferrer: 'Référent d\'origine',
      smartLockCode: 'Code de verrouillage intelligent',
      call: 'Téléphonez-nous',
      rules: 'Règles',
      howToMakeIn: 'Comment faire en',
      facilities: 'Installations',
      extras: 'Suppléments',
    },
    checkInDetails: {
      email: 'Veuillez saisir votre e-mail',
      invalidEmail: 'Email invalide',
      sent: 'Les informations ont été envoyées à {email}',
      information: 'Informations d\'enregistrement',
      askQuestion: 'poser une question',
      feedback: 'Envoyer des commentaires',
      sendToEmail: 'Envoyez ces informations à mon adresse e-mail',
    },
    checkout: {
      search: 'Recherche',
      checkOutDetails: 'Détails de la caisse',
    },
    checkOutDetails: {
      askQuestion: 'poser une question',
      feedback: 'Envoyer des commentaires',
    },
    feedback: {
      sent: 'Votre message a été envoyé',
    },
    rules: {
      header: 'Règles de vie',
      agree: 'Je suis d\'accord',
    },
    tax: {
      guestLimit: 'Nous ne pouvons pas accueillir plus de {limit} invités',
      extraGuest: 'Vous devrez payer pour un invité supplémentaire',
      lessDocs: 'N\'oubliez pas d\'ajouter une photo de document pour chaque invité',
      makePhoto: 'Prendre une photo',
    },
    guide: {
      p0: 'Voici les exigences relatives à la taille et à la qualité des images des documents pour un traitement réussi des images :',
      p1: {
        title: 'Objets étrangers et distorsions',
        body: 'Assurez-vous que vos mains ou d\'autres objets ne couvrent pas les données du document. Lors de la numérisation d\'un passeport, assurez-vous que les pages sont correctement alignées et que toutes les données sont clairement visibles.',
      },
      p2: {
        title: 'Bonne éclairage',
        body: 'Une bonne éclairage aide à obtenir de meilleurs résultats OCR. Si l\'image est trop sombre ou trop lumineuse, le document peut ne pas être correctement traité.',
      },
      p3: {
        title: 'Évitez les reflets',
        body: 'Les reflets et les éclats gênent le traitement et réduisent la précision de l\'extraction des données. Nous vous recommandons de ne pas utiliser le flash de votre appareil mobile lors de la prise de photos des documents.',
      },
      p4: {
        title: 'Mise au point et netteté',
        body: 'Assurez-vous que l\'image est claire et sans zones floues.',
      },
      p5: {
        title: 'Angle',
        body: 'L\'angle d\'inclinaison du document ne doit pas dépasser 10 degrés dans toutes les directions (horizontale ou verticale).',
      },
      p6: {
        title: 'Marges (trop petites)',
        body: 'Assurez-vous qu\'il y a un espace minimal autour du document. Il est recommandé que le document occupe 70 à 80 % de l\'image.',
      },
      p7: {
        title: 'Marges (trop grandes)',
        body: 'Assurez-vous que l\'espace autour du document ne prend pas plus de 20 à 30 % de l\'image. Il est recommandé que le document occupe 70 à 80 % de l\'image.',
      },
      p8: {
        title: 'Contraste',
        body: 'Le document doit contraster clairement avec l\'arrière-plan. Un document clair sur un fond clair ou un document sombre sur un fond sombre peut ne pas être reconnu.',
      },
      p9: {
        title: 'Résolution de l\'image',
        body: 'Pour obtenir une bonne qualité de reconnaissance des documents, nous vous recommandons de fournir des images prises avec une caméra d\'une résolution d\'au moins Full HD (1920×1080) et avec autofocus.',
      }
    },
  },
  de: {
    common: {
      back: 'Zurück',
      next: 'Nächster Schritt',
      exit: 'Ausfahrt',
      error: 'Ein Fehler ist aufgetreten, bitte wenden Sie sich an den Support',
      close: 'Schließen',
      cancel: 'Stornieren',
      done: 'Erledigt',
    },
    selectBooking: {
      haveBooking: 'Ich habe eine Buchung',
      checkOut: 'Kasse',
      wantToBook: 'ich möchte buchen'
    },
    confirmation: {
      search: 'Suchen',
      information: 'Information',
      rules: 'Regeln',
      payment: 'Zahlung',
      checkInDetails: 'Check-In-Details',
    },
    instruction: {
      register: 'Sie sollten Ihre Gäste anmelden',
      pay: 'und zahlen die City Tax',
    },
    payment: {
      debt: 'Ihre Schulden sind {debt} €',
      cash: 'Ich kann nicht mit Karte bezahlen',
      success: 'Danke für deine Bezahlung. Sie können zum nächsten Schritt gehen',
      pay: 'Zahlen',
    },
    photos: {
      takePhoto: 'Foto machen',
      remove: 'Entfernen',
      upload: 'Hochladen',
    },
    search: {
      property: 'Eigentum',
      room: 'Zimmer',
      checkIn: 'Einchecken',
      checkOut: 'Check-out',
      originalReferrer: 'Ursprünglicher Referrer',
      label: 'Geben Sie den Nachnamen ein, der die Buchungs- oder Auftragsnummer erstellt hat',
      choose: 'Wählen Sie Ihre Buchung',
      restriction: 'Die Registrierung ist nur 4 Tage vor dem Check-in möglich',
    },
    bookingInfo: {
      header: 'Details zu Ihrer Reservierung',
      roomNumber: 'Zimmernummer',
      checkIn: 'Einchecken',
      checkOut: 'CheckOut',
      fullName: 'Vollständiger Name',
      originalReferrer: 'Ursprünglicher Referrer',
      smartLockCode: 'Smart-Lock-Code',
      call: 'Rufen Sie uns an',
      rules: 'Regeln',
      howToMakeIn: 'Wie man reinkommt',
      facilities: 'Einrichtungen',
      extras: 'Extras',
    },
    checkInDetails: {
      email: 'Bitte geben Sie Ihre E-Mail ein',
      invalidEmail: 'Ungültige E-Mail',
      sent: 'Informationen wurden an {email} gesendet',
      information: 'Informationen zum Check-in',
      askQuestion: 'Stelle eine Frage',
      feedback: 'Feedback abschicken',
      sendToEmail: 'Senden Sie diese Informationen an meine E-Mail-Adresse',
    },
    checkout: {
      search: 'Suchen',
      checkOutDetails: 'CheckOut-Details',
    },
    checkOutDetails: {
      askQuestion: 'Stelle eine Frage',
      feedback: 'Feedback abschicken',
    },
    feedback: {
      sent: 'Ihre Nachricht wurde gesendet',
    },
    rules: {
      header: 'Lebendige Regeln',
      agree: 'Ich bin einverstanden',
    },
    tax: {
      guestLimit: 'Wir können nicht mehr als {limit} Gäste empfangen',
      extraGuest: 'Für einen zusätzlichen Gast müssen Sie bezahlen',
      lessDocs: 'Vergessen Sie nicht, für jeden Gast ein Dokumentenfoto hinzuzufügen',
      makePhoto: 'Machen Sie ein Foto',
    },
    guide: {
      p0: 'Nachfolgend finden Sie die Anforderungen an die Größe und Qualität von Dokumentbildern für eine erfolgreiche Bildverarbeitung:',
      p1: {
        title: 'Fremde Objekte und Verzerrungen',
        body: 'Stellen Sie sicher, dass Ihre Hände oder andere Objekte die Dokumentendaten nicht verdecken. Beim Scannen eines Reisepasses stellen Sie sicher, dass die Seiten korrekt ausgerichtet sind und alle Daten klar sichtbar sind.',
      },
      p2: {
        title: 'Gute Beleuchtung',
        body: 'Gute Beleuchtung hilft, bessere OCR-Ergebnisse zu erzielen. Wenn das Bild zu dunkel oder zu hell ist, kann das Dokument möglicherweise nicht korrekt verarbeitet werden.',
      },
      p3: {
        title: 'Vermeiden Sie Reflexionen',
        body: 'Blendungen und Reflexionen stören die Verarbeitung und verringern die Genauigkeit der Datenerfassung. Wir empfehlen, beim Fotografieren von Dokumenten den Blitz des mobilen Geräts nicht zu verwenden.',
      },
      p4: {
        title: 'Fokus und Schärfe',
        body: 'Stellen Sie sicher, dass das Bild klar ist und keine unscharfen Bereiche vorhanden sind.',
      },
      p5: {
        title: 'Winkel',
        body: 'Der Neigungswinkel des Dokuments sollte in jede Richtung (horizontal oder vertikal) nicht mehr als 10 Grad betragen.',
      },
      p6: {
        title: 'Ränder (zu klein)',
        body: 'Stellen Sie sicher, dass der Abstand um das Dokument minimal ist. Es wird empfohlen, dass das Dokument 70-80 % des Bildes einnimmt.',
      },
      p7: {
        title: 'Ränder (zu groß)',
        body: 'Stellen Sie sicher, dass der Raum um das Dokument nicht mehr als 20-30 % des Bildes ausmacht. Es wird empfohlen, dass das Dokument 70-80 % des Bildes einnimmt.',
      },
      p8: {
        title: 'Kontrast',
        body: 'Das Dokument sollte deutlich vom Hintergrund abheben. Ein heller Dokument auf einem hellen Hintergrund oder ein dunkles Dokument auf einem dunklen Hintergrund könnte nicht erkannt werden.',
      },
      p9: {
        title: 'Bildauflösung',
        body: 'Um eine gute Dokumentenerkennungsqualität zu erreichen, empfehlen wir, Bilder mit einer Auflösung von mindestens Full HD (1920×1080) und Autofokus bereitzustellen.',
      }
    }
  },
  it: {
    common: {
      back: 'Indietro',
      next: 'Passo successivo',
      exit: 'Uscita',
      error: 'Si è verificato un errore, contatta l\'assistenza',
      close: 'Vicino',
      cancel: 'Annulla',
      done: 'Fatto',
    },
    selectBooking: {
      haveBooking: 'Ho una prenotazione',
      checkOut: 'Guardare',
      wantToBook: 'Voglio prenotare'
    },
    confirmation: {
      search: 'Ricerca',
      information: 'Informazione',
      rules: 'Regole',
      payment: 'Pagamento',
      checkInDetails: 'Dettagli del check-in',
    },
    instruction: {
      register: 'Dovresti registrare i tuoi ospiti',
      pay: 'e pagare la tassa di soggiorno',
    },
    payment: {
      debt: 'Il tuo debito è {debt} €',
      cash: 'Non posso pagare con la carta',
      success: 'Grazie per il tuo pagamento. Puoi andare al passaggio successivo',
      pay: 'Paga',
    },
    photos: {
      takePhoto: 'Fare foto',
      remove: 'Rimuovere',
      upload: 'Caricamento',
    },
    search: {
      property: 'Proprietà',
      room: 'Camera',
      checkIn: 'Registrare',
      checkOut: 'Guardare',
      originalReferrer: 'Referente originale',
      label: 'Inserisci il cognome di chi ha creato la prenotazione o il numero d\'ordine',
      choose: 'Scegli la tua Prenotazione',
      restriction: 'La registrazione è aperta solo 4 giorni prima del check-in',
    },
    bookingInfo: {
      header: 'Dettagli sulla tua prenotazione',
      roomNumber: 'Numero di Camera',
      checkIn: 'Registrare',
      checkOut: 'Guardare',
      fullName: 'Nome e cognome',
      originalReferrer: 'Referente originale',
      smartLockCode: 'Codice serratura intelligente',
      call: 'Telefonateci',
      rules: 'Regole',
      howToMakeIn: 'Come entrare',
      facilities: 'Strutture',
      extras: 'Extra',
    },
    checkInDetails: {
      email: 'Inserisci la tua e-mail',
      invalidEmail: 'E-mail non valido',
      sent: 'Le informazioni sono state inviate a {email}',
      information: 'Informazioni sul check-in',
      askQuestion: 'Fai una domanda',
      feedback: 'Invia feedback',
      sendToEmail: 'Invia queste informazioni al mio indirizzo email',
    },
    checkout: {
      search: 'Ricerca',
      checkOutDetails: 'Dettagli di pagamento',
    },
    checkOutDetails: {
      askQuestion: 'Fai una domanda',
      feedback: 'Invia feedback',
    },
    feedback: {
      sent: 'Il tuo messaggio è stato inviato',
    },
    rules: {
      header: 'Regole di vita',
      agree: 'io sono d\'accordo',
    },
    tax: {
      guestLimit: 'Non possiamo recensire più di {limit} ospiti',
      extraGuest: 'Ti verrà richiesto di pagare per un ospite aggiuntivo',
      lessDocs: 'Non dimenticare di aggiungere una foto documento per ogni ospi',
      makePhoto: 'Fare una foto',
    },
    guide: {
      p0: 'Di seguito sono riportati i requisiti per le dimensioni e la qualità delle immagini dei documenti per un\'elaborazione delle immagini riuscita:',
      p1: {
        title: 'Oggetti esterni e distorsioni',
        body: 'Assicurati che le tue mani o altri oggetti non coprano i dati del documento. Quando scansiona un passaporto, assicurati che le pagine siano allineate correttamente e che tutti i dati siano chiaramente visibili.',
      },
      p2: {
        title: 'Buona illuminazione',
        body: 'Una buona illuminazione aiuta a ottenere risultati migliori con l\'OCR. Se l\'immagine è troppo scura o troppo luminosa, il documento potrebbe non essere elaborato correttamente.',
      },
      p3: {
        title: 'Evita i riflessi',
        body: 'Riflessi e bagliori interferiscono con l\'elaborazione e riducono la precisione dell\'estrazione dei dati. Ti consigliamo di non usare il flash del dispositivo mobile quando scatti foto ai documenti.',
      },
      p4: {
        title: 'Messa a fuoco e nitidezza',
        body: 'Assicurati che l\'immagine sia chiara e priva di aree sfocate.',
      },
      p5: {
        title: 'Angolo',
        body: 'L\'inclinazione del documento non deve superare i 10 gradi in qualsiasi direzione (orizzontale o verticale).',
      },
      p6: {
        title: 'Margini (troppo piccoli)',
        body: 'Assicurati che ci sia uno spazio minimo attorno al documento. È consigliato che il documento occupi il 70-80% dell\'immagine.',
      },
      p7: {
        title: 'Margini (troppo grandi)',
        body: 'Assicurati che lo spazio attorno al documento non occupi più del 20-30% dell\'immagine. È consigliato che il documento occupi il 70-80% dell\'immagine.',
      },
      p8: {
        title: 'Contrasto',
        body: 'Il documento deve contrapporsi chiaramente allo sfondo. Un documento chiaro su uno sfondo chiaro o un documento scuro su uno sfondo scuro potrebbe non essere riconosciuto.',
      },
      p9: {
        title: 'Risoluzione dell\'immagine',
        body: 'Per ottenere una buona qualità di riconoscimento dei documenti, ti consigliamo di fornire immagini scattate con una fotocamera con una risoluzione di almeno Full HD (1920×1080) e autofocus.',
      }
    },
  },
  pl: {
    common: {
      back: 'Z powrotem',
      next: 'Następny krok',
      exit: 'Wyjście',
      error: 'Wystąpił błąd, skontaktuj się z pomocą techniczną',
      close: 'Zamknąć',
      cancel: 'Anulować',
      done: 'Zrobione',
    },
    selectBooking: {
      haveBooking: 'Mam rezerwację',
      checkOut: 'Wymeldować się',
      wantToBook: 'chcę zarezerwować'
    },
    confirmation: {
      search: 'Szukaj',
      information: 'Informacja',
      rules: 'Zasady',
      payment: 'Zapłata',
      checkInDetails: 'Szczegóły zameldowania',
    },
    instruction: {
      register: 'Powinieneś zarejestrować swoich gości',
      pay: 'i zapłacić podatek miejski',
    },
    payment: {
      debt: 'Twój dług jest {debt} €',
      cash: 'Nie mogę zapłacić kartą',
      success: 'Dziękujemy za dokonanie płatności. Możesz przejść do następnego kroku',
      pay: 'Płacić',
    },
    photos: {
      takePhoto: 'Zrobić zdjęcie',
      remove: 'Usunąć',
      upload: 'Wgrywać',
    },
    search: {
      property: 'Nieruchomość',
      room: 'Pokój',
      checkIn: 'Zameldować się',
      checkOut: 'Wymeldować się',
      originalReferrer: 'Oryginalny odsyłacz',
      label: 'Wprowadź nazwisko osoby, która utworzyła rezerwację lub numer zamówienia',
      choose: 'Wybierz swoją rezerwację',
      restriction: 'Rejestracja jest otwarta tylko 4 dni przed zameldowaniem',
    },
    bookingInfo: {
      header: 'Szczegóły dotyczące Twojej rezerwacji',
      roomNumber: 'Numer pokoju',
      checkIn: 'Zameldować się',
      checkOut: 'Wymeldować się',
      fullName: 'Pełne imię i nazwisko',
      originalReferrer: 'Oryginalny odsyłacz',
      smartLockCode: 'Inteligentny kod blokady',
      call: 'Zadzwoń do nas',
      rules: 'Zasady',
      howToMakeIn: 'Jak wprowadzić',
      facilities: 'Udogodnienia',
      extras: 'Dodatki',
    },
    checkInDetails: {
      email: 'Proszę wprowadzić swój e-mail',
      invalidEmail: 'Niepoprawny email',
      sent: 'Informacje zostały wysłane na adres {email}',
      information: 'Informacje dotyczące zameldowania',
      askQuestion: 'Zadać pytanie',
      feedback: 'Wyślij opinię',
      sendToEmail: 'Wyślij te informacje na mój adres e-mail',
    },
    checkout: {
      search: 'Szukaj',
      checkOutDetails: 'Szczegóły kasy',
    },
    checkOutDetails: {
      askQuestion: 'Zadać pytanie',
      feedback: 'Wyślij opinię',
    },
    feedback: {
      sent: 'Twoja wiadomość została wysłana',
    },
    rules: {
      header: 'Zasady życia',
      agree: 'zgadzam się',
    },
    tax: {
      guestLimit: 'Nie możemy odzyskać gości więcej niż {limit} gości',
      extraGuest: 'Będziesz musiał zapłacić za dodatkowego gościa',
      lessDocs: 'Nie zapomnij dodać zdjęcia dokumentu dla każdego gościa',
      makePhoto: 'Zrobić zdjęcie',
    },
    guide: {
      p0: 'Poniżej znajdują się wymagania dotyczące rozmiaru i jakości obrazów dokumentów do pomyślnego przetwarzania obrazów:',
      p1: {
        title: 'Obce przedmioty i zniekształcenia',
        body: 'Upewnij się, że twoje ręce lub inne przedmioty nie zakrywają danych dokumentu. Podczas skanowania paszportu upewnij się, że strony są prawidłowo wyrównane i wszystkie dane są wyraźnie widoczne.',
      },
      p2: {
        title: 'Dobre oświetlenie',
        body: 'Dobre oświetlenie pomaga uzyskać lepsze wyniki OCR. Jeśli obraz jest zbyt ciemny lub zbyt jasny, dokument może zostać błędnie przetworzony.',
      },
      p3: {
        title: 'Unikaj odbić',
        body: 'Odbicia i refleksy utrudniają przetwarzanie i zmniejszają dokładność wyodrębniania danych. Zalecamy unikanie używania lampy błyskowej urządzenia mobilnego przy robieniu zdjęć dokumentów.',
      },
      p4: {
        title: 'Ostrzeżenie i ostrość',
        body: 'Upewnij się, że obraz jest wyraźny i nie zawiera rozmytych obszarów.',
      },
      p5: {
        title: 'Kąt',
        body: 'Kąt nachylenia dokumentu nie powinien przekraczać 10 stopni w żadnym kierunku (poziomym ani pionowym).',
      },
      p6: {
        title: 'Marginesy (za małe)',
        body: 'Upewnij się, że wokół dokumentu jest minimalna przestrzeń. Zaleca się, aby dokument zajmował 70-80% obrazu.',
      },
      p7: {
        title: 'Marginesy (za duże)',
        body: 'Upewnij się, że przestrzeń wokół dokumentu nie zajmuje więcej niż 20-30% obrazu. Zaleca się, aby dokument zajmował 70-80% obrazu.',
      },
      p8: {
        title: 'Kontrast',
        body: 'Dokument powinien wyraźnie kontrastować z tłem. Jasny dokument na jasnym tle lub ciemny dokument na ciemnym tle mogą nie zostać rozpoznane.',
      },
      p9: {
        title: 'Rozdzielczość obrazu',
        body: 'Aby uzyskać dobrą jakość rozpoznawania dokumentów tożsamości, zaleca się dostarczenie zdjęć wykonanych aparatem o rozdzielczości co najmniej Full HD (1920×1080) i z automatycznym ustawieniem ostrości.',
      }
    }
  },
  sl: {
    common: {
      back: 'Nazaj',
      next: 'Naslednji korak',
      exit: 'Izhod',
      error: 'Prišlo je do napake, obrnite se na podporo',
      close: 'Zapri',
      cancel: 'Prekliči',
      done: 'Končano',
    },
    selectBooking: {
      haveBooking: 'Imam rezervacijo',
      checkOut: 'Odjava',
      wantToBook: 'Želim rezervirati'
    },
    confirmation: {
      search: 'Iskanje',
      information: 'Informacije',
      rules: 'Pravila',
      payment: 'Plačilo',
      checkInDetails: 'Podrobnosti o prijavi',
    },
    instruction: {
      register: 'Prijavite svoje goste',
      pay: 'in plačati mestni davek',
    },
    payment: {
      debt: 'Vaš dolg je {debt} €',
      cash: 'Ne morem plačati s kartico',
      success: 'Hvala za vaše plačilo. Lahko greš na naslednji korak',
      pay: 'Plačaj',
    },
    photos: {
      takePhoto: 'Posnemi fotografijo',
      remove: 'Odstrani',
      upload: 'Naloži',
    },
    search: {
      property: 'Hotel',
      room: 'Soba',
      checkIn: 'Prijava',
      checkOut: 'Odjava',
      originalReferrer: 'Prvotni napotitelj',
      label: 'Vpišite priimek osebe, ki je ustvarila številko rezervacije ali naročila',
      choose: 'Izberite svojo rezervacijo',
      restriction: 'Registracija je odprta le 4 dni pred prihodom',
    },
    bookingInfo: {
      header: 'Podrobnosti o vaši rezervaciji',
      roomNumber: 'Številka sobe',
      checkIn: 'Prijava',
      checkOut: 'Odjava',
      fullName: 'Polno ime',
      originalReferrer: 'Prvotni napotitelj',
      smartLockCode: 'Koda pametnega zaklepanja',
      call: 'Pokličite nas',
      rules: 'Pravila',
      howToMakeIn: 'Kako narediti noter',
      facilities: 'Objekti',
      extras: 'Dodatki',
    },
    checkInDetails: {
      email: 'Prosimo vnesite svoj e-mail',
      invalidEmail: 'Neveljaven e-poštni naslov',
      sent: 'Informacije so bile poslane na {email}',
      information: 'Informacije o prijavi',
      askQuestion: 'Postavi vprašanje',
      feedback: 'Pošlji povratno informacijo',
      sendToEmail: 'Pošlji te podatke na moj e-poštni naslov',
    },
    checkout: {
      search: 'Iskanje',
      checkOutDetails: 'Podrobnosti o odjavi',
    },
    checkOutDetails: {
      askQuestion: 'Postavi vprašanje',
      feedback: 'Pošlji povratno informacijo',
    },
    feedback: {
      sent: 'Vaše sporočilo je bilo poslano',
    },
    rules: {
      header: 'Življenjska pravila',
      agree: 'se strinjam',
    },
    tax: {
      guestLimit: 'Ne moremo oživiti več kot {limit} gostov',
      extraGuest: 'Za dodatnega gosta boste morali plačati',
      lessDocs: 'Ne pozabite dodati fotografije dokumenta za vsakega gosta',
      makePhoto: 'Naredi fotografijo',
    },
    guide: {
      p0: 'Spodaj so zahtevani velikost in kakovost slik dokumentov za uspešno obdelavo slik:',
      p1: {
        title: 'Tuje predmete in popačenja',
        body: 'Prepričajte se, da vaše roke ali drugi predmeti ne pokrivajo podatkov na dokumentu. Pri skeniranju potnega lista se prepričajte, da so strani pravilno poravnane in da so vsi podatki jasno vidni.',
      },
      p2: {
        title: 'Dobro osvetlitev',
        body: 'Dobro osvetlitev pomaga doseči boljše rezultate OCR. Če je slika pretemna ali preveč svetla, je lahko dokument obdelan napačno.',
      },
      p3: {
        title: 'Izogibajte se odsevom',
        body: 'Odbijajoča se svetloba in odsevi ovirajo obdelavo in zmanjšujejo natančnost ekstrakcije podatkov. Priporočamo, da ne uporabljate bliskavice mobilne naprave pri fotografiranju dokumentov.',
      },
      p4: {
        title: 'Fokus in ostrina',
        body: 'Prepričajte se, da je slika jasna in da na njej ni zamegljenih področij.',
      },
      p5: {
        title: 'Kot',
        body: 'Kot nagiba dokumenta ne sme presegati 10 stopinj v katerem koli smeri (horizontalno ali vertikalno).',
      },
      p6: {
        title: 'Robovi (premajhni)',
        body: 'Prepričajte se, da je okoli dokumenta dovolj prostora. Priporočamo, da dokument zavzema 70-80 % slike.',
      },
      p7: {
        title: 'Robovi (preveliki)',
        body: 'Prepričajte se, da prostor okoli dokumenta ne zavzema več kot 20-30 % slike. Priporočamo, da dokument zavzema 70-80 % slike.',
      },
      p8: {
        title: 'Kontrast',
        body: 'Dokument mora biti v jasnem kontrastu s ozadjem. Svetel dokument na svetlem ozadju ali temen dokument na temnem ozadju morda ne bodo prepoznani.',
      },
      p9: {
        title: 'Ločljivost slike',
        body: 'Za dobro kakovost prepoznavanja dokumentov z identifikacijo priporočamo, da predložite slike, posnete s kamero z ločljivostjo vsaj Full HD (1920×1080) in samodejno ostrino.',
      }
    },
  },
  es: {
    common: {
      back: 'Atrás',
      next: 'Próximo paso',
      exit: 'Salida',
      error: 'Se produjo un error, póngase en contacto con el soporte.',
      close: 'Cerca',
      cancel: 'Cancelar',
      done: 'Hecho',
    },
    selectBooking: {
      haveBooking: 'tengo una reserva',
      checkOut: 'Verificar',
      wantToBook: 'quiero reservar'
    },
    confirmation: {
      search: 'Buscar',
      information: 'Información',
      rules: 'Normas',
      payment: 'Pago',
      checkInDetails: 'Detalles de registro',
    },
    instruction: {
      register: 'Debes registrar a tus invitados',
      pay: 'y pagar el impuesto municipal',
    },
    payment: {
      debt: 'tu deuda es {debt} €',
      cash: 'no puedo pagar con tarjeta',
      success: 'Gracias por tu pago. Puedes ir al siguiente paso',
      pay: 'Pagar',
    },
    photos: {
      takePhoto: 'Tomar foto',
      remove: 'Eliminar',
      upload: 'Subir',
    },
    search: {
      property: 'Propiedad',
      room: 'Habitación',
      checkIn: 'Registrarse',
      checkOut: 'Verificar',
      originalReferrer: 'Referencia original',
      label: 'Introduce el apellido de quien ha creado la reserva o número de pedido',
      choose: 'Elige tu Reserva',
      restriction: 'El registro está abierto 4 días antes del check-in solamente',
    },
    bookingInfo: {
      header: 'Detalles sobre su reserva',
      roomNumber: 'Número de habitación',
      checkIn: 'Registrarse',
      checkOut: 'Verificar',
      fullName: 'Nombre completo',
      originalReferrer: 'Referencia original',
      smartLockCode: 'Código de bloqueo inteligente',
      call: 'Llámenos',
      rules: 'Normas',
      howToMakeIn: 'como hacer en',
      facilities: 'Instalaciones',
      extras: 'Extras',
    },
    checkInDetails: {
      email: 'Por favor ingrese su correo electrónico',
      invalidEmail: 'Email inválido',
      sent: 'La información ha sido enviada a {email}',
      information: 'información de check-in',
      askQuestion: 'Hacer una pregunta',
      feedback: 'Enviar comentarios',
      sendToEmail: 'Enviar esta información a mi dirección de correo electrónico',
    },
    checkout: {
      search: 'Buscar',
      checkOutDetails: 'Detalles de pago',
    },
    checkOutDetails: {
      askQuestion: 'Hacer una pregunta',
      feedback: 'Enviar comentarios',
    },
    feedback: {
      sent: 'Tu mensaje ha sido enviado',
    },
    rules: {
      header: 'Reglas de vida',
      agree: 'estoy de acuerdo',
    },
    tax: {
      guestLimit: 'No podemos revivir a más de {limit} invitados',
      extraGuest: 'Se le pedirá que pague por un invitado adicional',
      lessDocs: 'No olvide agregar una foto de documento para cada invitado',
      makePhoto: 'Hacer una foto',
    },
    guide: {
      p0: 'A continuación se detallan los requisitos de tamaño y calidad de las imágenes de documentos para un procesamiento exitoso de imágenes:',
      p1: {
        title: 'Objetos extraños y distorsiones',
        body: 'Asegúrese de que sus manos o cualquier otro objeto no estén cubriendo los datos del documento. Al escanear el pasaporte, asegúrese de que las páginas estén correctamente alineadas y todos los datos sean claramente visibles.'
      },
      p2: {
        title: 'Buena iluminación',
        body: 'Una buena iluminación ayuda a obtener mejores resultados de OCR. Si la imagen es demasiado oscura o demasiado brillante, el documento puede ser procesado incorrectamente.'
      },
      p3: {
        title: 'Evite los reflejos',
        body: 'Los reflejos y destellos interfieren con el procesamiento y reducen la precisión de la extracción de datos. Recomendamos no usar el flash del dispositivo móvil al tomar fotos de documentos.'
      },
      p4: {
        title: 'Enfoque y nitidez',
        body: 'Asegúrese de que la imagen esté nítida y que no haya áreas borrosas.'
      },
      p5: {
        title: 'Ángulo',
        body: 'El ángulo de inclinación del documento no debe exceder los 10 grados en ninguna dirección (horizontal o vertical).'
      },
      p6: {
        title: 'Márgenes (demasiado pequeños)',
        body: 'Asegúrese de que haya un espacio mínimo alrededor del documento. Se recomienda que el documento ocupe entre el 70% y el 80% de la imagen.'
      },
      p7: {
        title: 'Márgenes (demasiado grandes)',
        body: 'Asegúrese de que el espacio alrededor del documento no ocupe más del 20-30% de la imagen. Se recomienda que el documento ocupe entre el 70% y el 80% de la imagen.'
      },
      p8: {
        title: 'Contraste',
        body: 'El documento debe contrastar claramente con el fondo. Un documento claro sobre un fondo claro, o un documento oscuro sobre un fondo oscuro, pueden no ser reconocidos.'
      },
      p9: {
        title: 'Resolución de la imagen',
        body: 'Para obtener una buena calidad de reconocimiento de documentos de identidad, recomendamos proporcionar imágenes tomadas con una cámara de al menos Full HD (1920×1080) y con enfoque automático.'
      }
    },
  },
});

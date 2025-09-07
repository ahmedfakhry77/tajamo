export default {
  common: {
    brand: "NoFal Perfumes",
    loading: "Cargando...",
    submit: "Enviar",
    cancel: "Cancelar",
    save: "Guardar",
    edit: "Editar",
    delete: "Eliminar",
    search: "Buscar",
    filter: "Filtrar",
    sort: "Ordenar",
    view: "Ver",
    add: "Agregar",
    remove: "Quitar",
    close: "Cerrar",
    back: "Atrás",
    next: "Siguiente",
    previous: "Anterior",
    continue: "Continuar",
    finish: "Finalizar",
    yes: "Sí",
    no: "No",
    confirm: "Confirmar",
    retry: "Reintentar",
    error: "Error",
    success: "Éxito",
    warning: "Advertencia",
    info: "Información",
    more: "más",
    newsletter: {
      subscribe: "Suscribirse",
      unsubscribe: "Cancelar Suscripción",
      email: "Correo Electrónico",
      success: "¡Gracias por suscribirte!",
      error: "Error al suscribirse. Inténtalo de nuevo.",
      alreadySubscribed: "Ya estás suscrito a nuestro boletín.",
    },
  },
  navigation: {
    home: "Inicio",
    about: "Acerca de",
    contact: "Contacto",
    login: "Iniciar Sesión",
    register: "Registrarse",
    profile: "Perfil",
    logout: "Cerrar Sesión",
    dashboard: "Panel",
    products: "Productos",
    cart: "Carrito",
    wishlist: "Lista de Deseos",
    orders: "Pedidos",
    shop: "Tienda",
  },
  shop: {
    title: "Tienda - Todos los Productos",
    header: {
      title: "Tienda - Todos los Productos",
      subtitle: "Descubre nuestra colección completa de fragancias",
    },
    filters: {
      title: "Filtros",
      category: {
        title: "Categoría",
        allCategories: "Todas las Categorías",
      },
      priceRange: {
        title: "Rango de Precio",
        min: "Mín",
        max: "Máx",
        currentRange: "Rango actual: {min} - {max}",
      },
      sortBy: {
        title: "Ordenar por",
        nameAsc: "Nombre: A a Z",
        nameDesc: "Nombre: Z a A",
        priceAsc: "Precio: Bajo a Alto",
        priceDesc: "Precio: Alto a Bajo",
        newest: "Más Recientes",
        oldest: "Más Antiguos",
      },
      activeFilters: {
        title: "Filtros Activos",
        search: 'Búsqueda: "{query}"',
        category: "Categoría",
        price: "Precio: {min} - {max}",
        sort: "Ordenar",
        clearAll: "Limpiar Todos los Filtros",
      },
    },
    search: {
      title: "Buscar Productos",
      placeholder: "Buscar por nombre del producto, descripción o categoría...",
    },
    results: {
      showing: "Mostrando {count} de {total} productos",
      noResults: {
        title: "No se encontraron productos",
        subtitle: "Intenta ajustar tus filtros o criterios de búsqueda.",
        clearFilters: "Limpiar Filtros",
      },
    },
    mobile: {
      filterButton: "Filtros",
      activeFilters: "Activos:",
      applyFilters: "Aplicar Filtros",
    },
    loadMore: "Cargar Más Productos",
    pagination: {
      page: "Página",
      of: "de",
      next: "Siguiente",
      previous: "Anterior",
      first: "Primera",
      last: "Última",
    },
  },
  cart: {
    title: "Carrito de Compras - Tajamo",
    header: {
      title: "Carrito de Compras",
      subtitle: "Revisa tus artículos y procede al checkout",
    },
    loading: "Cargando carrito...",
    empty: {
      title: "Tu carrito está vacío",
      subtitle: "Parece que aún no has agregado artículos a tu carrito.",
      continueShopping: "Continuar Comprando",
    },
    items: {
      title: "Artículos del Carrito ({count})",
      remove: "Eliminar artículo",
      quantity: "Cantidad",
      increment: "Incrementar cantidad",
      decrement: "Decrementar cantidad",
      updateQuantity: "Actualizar cantidad",
      itemRemoved: "Artículo eliminado del carrito",
      itemAdded: "Artículo agregado al carrito",
    },
    summary: {
      title: "Resumen del Pedido",
      subtotal: "Subtotal ({count} artículos)",
      shipping: "Envío",
      tax: "Impuestos",
      total: "Total",
      free: "Gratis",
      calculatedAtCheckout: "Calculado al finalizar",
      estimatedTotal: "Total Estimado",
    },
    actions: {
      checkout: "Proceder al Checkout",
      processing: "Procesando...",
      continueShopping: "Continuar Comprando",
      updateCart: "Actualizar Carrito",
      clearCart: "Vaciar Carrito",
      saveForLater: "Guardar para Después",
    },
    messages: {
      cartUpdated: "Carrito actualizado",
      itemRemoved: "Artículo eliminado",
      quantityUpdated: "Cantidad actualizada",
      cartCleared: "Carrito vaciado",
      errorUpdating: "Error al actualizar el carrito",
      unsavedChanges: "Tienes cambios sin guardar",
    },
  },
  favorites: {
    title: "Mis Favoritos - Tajamo",
    header: {
      title: "Mis Favoritos",
      subtitle: "Tus productos guardados y elementos de la lista de deseos",
    },
    loading: "Cargando favoritos...",
    empty: {
      title: "Aún no hay favoritos",
      subtitle:
        "Comienza a construir tu lista de deseos agregando productos que te encanten.",
      startShopping: "Comenzar a Comprar",
    },
    actions: {
      addMore: "Agregar Más",
      clearAll: "Limpiar Todo",
      continueShopping: "Continuar Comprando",
      moveToCart: "Mover al Carrito",
      shareWishlist: "Compartir Lista",
    },
    filters: {
      active: "Activos:",
      search: "Búsqueda",
      category: "Categoría",
      price: "Precio",
      sort: "Ordenar",
      clearFilters: "Limpiar Filtros",
    },
    product: {
      addToCart: "Agregar al Carrito",
      removeFromFavorites: "Eliminar de Favoritos",
      inStock: "En Stock",
      outOfStock: "Sin Stock",
      noDescription: "Sin descripción disponible",
      viewDetails: "Ver Detalles",
      quickView: "Vista Rápida",
    },
    messages: {
      addedToFavorites: "Producto agregado a favoritos",
      removedFromFavorites: "Producto eliminado de favoritos",
      movedToCart: "Producto movido al carrito",
      favoritesCleared: "Lista de favoritos limpiada",
      errorUpdating: "Error al actualizar favoritos",
    },
  },
  product: {
    addToCart: "Agregar al Carrito",
    addToFavorites: "Agregar a Favoritos",
    removeFromFavorites: "Eliminar de Favoritos",
    inStock: "En Stock",
    outOfStock: "Sin Stock",
    quantity: "Cantidad",
    viewDetails: "Ver Detalles",
    close: "Cerrar",
    price: "Precio",
    category: "Categoría",
    description: "Descripción",
    stock: "Stock",
    noDescription: "Sin descripción disponible",
    selectSize: "Seleccionar Talla",
    selectColor: "Seleccionar Color",
    selectVariant: "Seleccionar Variante",
    reviews: "Reseñas",
    rating: "Calificación",
    writeReview: "Escribir Reseña",
    specifications: "Especificaciones",
    ingredients: "Ingredientes",
    howToUse: "Cómo Usar",
    shipping: "Envío",
    returns: "Devoluciones",
    warranty: "Garantía",
    relatedProducts: "Productos Relacionados",
    recentlyViewed: "Vistos Recientemente",
    share: "Compartir",
    print: "Imprimir",
    email: "Enviar por Email",
  },
  home: {
    hero: {
      title: "Descubre Tu Fragancia Signature",
      subtitle:
        "Fragancias de lujo que cuentan tu historia. Desde la elegancia clásica hasta la sofisticación moderna, encuentra el perfume perfecto que capture tu esencia.",
      shopNow: "Comprar Ahora",
      exploreCollection: "Explorar Colección",
    },
    categories: {
      title: "Categorías",
      subtitle:
        "Explora nuestras colecciones organizadas por tipo de fragancia",
      womens: {
        title: "Fragancias Femeninas",
        description: "Aromas elegantes y sofisticados",
      },
      mens: {
        title: "Fragancias Masculinas",
        description: "Aromas audaces y masculinos",
      },
      unisex: {
        title: "Fragancias Unisex",
        description: "Aromas versátiles y únicos",
      },
    },
    featuredProducts: {
      title: "Fragancias Destacadas",
      subtitle: "Descubre nuestras fragancias más populares y exclusivas",
      viewAll: "Ver Todos los Productos",
      addToCart: "Agregar al Carrito",
    },
    products: {
      roseElegance: {
        name: "Elegancia de Rosa",
        description: "Una mezcla atemporal de rosas búlgaras",
        price: "$89.99",
      },
      oceanBreeze: {
        name: "Brisa del Océano",
        description: "Notas acuáticas frescas con cítricos",
        price: "$79.99",
      },
      goldenAmber: {
        name: "Ámbar Dorado",
        description: "Aroma oriental cálido y sensual",
        price: "$94.99",
      },
      lavenderDreams: {
        name: "Sueños de Lavanda",
        description: "Aroma calmante y pacífico",
        price: "$69.99",
      },
    },
    whyChooseUs: {
      title: "¿Por Qué Elegir Tajamo?",
      naturalIngredients: {
        title: "Ingredientes Naturales",
        description:
          "Aceites esenciales de la más alta calidad y extractos naturales para fragancias auténticas.",
      },
      freeShipping: {
        title: "Envío Gratis",
        description:
          "Envío gratuito mundial en pedidos superiores a $100. Entrega rápida y segura.",
      },
      luxuryQuality: {
        title: "Calidad de Lujo",
        description:
          "Fragancias artesanales con atención al detalle y poder duradero.",
      },
    },
    quieroAesoria: {
      title: "¿Necesitas Asesoría en Perfumes?",
      subtitle:
        "Nuestros expertos te ayudarán a encontrar la fragancia perfecta que se adapte a tu personalidad y estilo de vida.",
      contactButton: "Quiero asesoría",
    },
    banners: {
      shopNow: "Comprar Ahora",
    },
  },
  about: {
    hero: {
      title: "Acerca de Tajamo",
      subtitle:
        "Somos apasionados por crear fragancias excepcionales que cuenten tu historia. Desde la elegancia clásica hasta la sofisticación moderna, cada aroma está elaborado con amor y experiencia para capturar la esencia de quién eres.",
    },
    mission: {
      title: "Nuestra Misión",
      description:
        "Crear fragancias de lujo que inspiren confianza, evoquen recuerdos y se conviertan en una extensión de tu personalidad. Creemos que todos merecen encontrar su fragancia signature - un aroma que los haga sentir hermosos, poderosos e inolvidables.",
    },
    story: {
      title: "Nuestra Historia",
      passionTitle: "Una Pasión por el Perfume",
      founded:
        "Fundada en 2020, Tajamo comenzó como un sueño de llevar el arte de la perfumería fina a todos. Nuestra fundadora, Isabella Rodriguez, creció en una familia de perfumistas tradicionales en España, aprendiendo los secretos de la creación de fragancias de su abuela.",
      legacy:
        "Hoy, continuamos este legado combinando técnicas tradicionales con innovación moderna, creando fragancias que honran el pasado mientras abrazan el futuro.",
      quote:
        "Cada fragancia cuenta una historia, y cada historia merece ser contada bellamente.",
      founder: "Isabella Rodriguez, Fundadora",
    },
    values: {
      title: "Nuestros Valores Fundamentales",
      naturalExcellence: {
        title: "Excelencia Natural",
        description:
          "Usamos solo los ingredientes naturales más finos, obtenidos de manera sostenible de todo el mundo. Cada aceite, extracto y esencia es cuidadosamente seleccionado por su calidad y pureza.",
      },
      artisanCraftsmanship: {
        title: "Artesanía Artesanal",
        description:
          "Cada fragancia es elaborada a mano por nuestros maestros perfumistas, que combinan ciencia y arte para crear aromas únicos y duraderos que evolucionan bellamente en tu piel.",
      },
      personalConnection: {
        title: "Conexión Personal",
        description:
          "Creemos que la fragancia es profundamente personal. Nuestro equipo trabaja de cerca con los clientes para entender sus preferencias y ayudarlos a encontrar su aroma perfecto.",
      },
    },
    process: {
      title: "Cómo Creamos Tu Fragancia",
      source: {
        title: "1. Origen",
        description:
          "Seleccionamos cuidadosamente los ingredientes más finos de fuentes sostenibles de todo el mundo.",
      },
      blend: {
        title: "2. Mezcla",
        description:
          "Nuestros perfumistas mezclan expertamente las notas para crear composiciones armoniosas y equilibradas.",
      },
      mature: {
        title: "3. Maduración",
        description:
          "Cada fragancia se envejece a la perfección, permitiendo que las notas se armonicen naturalmente.",
      },
      perfect: {
        title: "4. Perfección",
        description:
          "Las pruebas finales aseguran que cada botella cumpla con nuestros exigentes estándares de calidad.",
      },
    },
    team: {
      title: "Conoce a Nuestros Artesanos del Perfume",
      isabella: {
        name: "Isabella Rodriguez",
        title: "Fundadora y Maestra Perfumista",
        description:
          "Con más de 15 años de experiencia en perfumería tradicional, Isabella trae el arte de la creación de fragancias españolas al mundo moderno.",
      },
      marcus: {
        name: "Dr. Marcus Chen",
        title: "Jefe de Química",
        description:
          "Un doctorado en Química Orgánica especializado en extracción de aceites esenciales y estabilidad de fragancias.",
      },
      sophia: {
        name: "Sophia Laurent",
        title: "Directora Creativa",
        description:
          "Ex directora creativa de marca de lujo que asegura que cada fragancia cuente una historia convincente.",
      },
    },
    sustainability: {
      title: "Nuestro Compromiso con la Sostenibilidad",
      description:
        "Estamos comprometidos a proteger nuestro planeta mientras creamos hermosas fragancias. Todo nuestro empaque es reciclable, nuestros ingredientes se obtienen de manera sostenible, y apoyamos prácticas de comercio justo con nuestros socios agrícolas.",
      ecoFriendly: {
        title: "Empaque Ecológico",
        description: "100% materiales reciclables",
      },
      sustainableSourcing: {
        title: "Abastecimiento Sostenible",
        description: "Ingredientes cosechados éticamente",
      },
      fairTrade: {
        title: "Comercio Justo",
        description: "Apoyando a las comunidades locales",
      },
    },
  },
  auth: {
    welcome: "Bienvenido de vuelta",
    footer: {
      copyright: "© 2024 Tajamo. Todos los derechos reservados.",
    },
    login: {
      title: "Inicia sesión en tu cuenta",
      email: "Dirección de correo electrónico",
      emailPlaceholder: "Ingresa tu correo electrónico",
      password: "Contraseña",
      passwordPlaceholder: "Ingresa tu contraseña",
      rememberMe: "Recuérdame",
      forgotPassword: "¿Olvidaste tu contraseña?",
      signIn: "Iniciar sesión",
      signingIn: "Iniciando sesión...",
      noAccount: "¿No tienes una cuenta?",
      signUp: "Regístrate",
    },
    register: {
      title: "Crea tu cuenta",
      name: "Nombre completo",
      namePlaceholder: "Ingresa tu nombre completo",
      email: "Dirección de correo electrónico",
      emailPlaceholder: "Ingresa tu correo electrónico",
      password: "Contraseña",
      passwordPlaceholder: "Crea una contraseña",
      passwordConfirmation: "Confirmar contraseña",
      passwordConfirmationPlaceholder: "Confirma tu contraseña",
      createAccount: "Crear cuenta",
      creatingAccount: "Creando cuenta...",
      haveAccount: "¿Ya tienes una cuenta?",
      signIn: "Inicia sesión",
    },
  },
  contact: {
    hero: {
      title: "Ponte en Contacto",
      subtitle:
        "¿Tienes una pregunta o quieres trabajar juntos? Nos encantaría saber de ti. Envíanos un mensaje y te responderemos lo antes posible.",
    },
    form: {
      title: "Envíanos un mensaje",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Dirección de correo electrónico",
      subject: "Asunto",
      message: "Mensaje",
      sendMessage: "Enviar Mensaje",
      sending: "Enviando...",
      success: "¡Gracias por tu mensaje! Te responderemos pronto.",
      error:
        "Lo sentimos, hubo un error enviando tu mensaje. Por favor, inténtalo de nuevo.",
    },
    contactInfo: {
      title: "Información de Contacto",
      address: "Dirección",
      addressValue:
        "123 Calle de la Innovación\nCiudad Tecnológica, TC 12345\nEstados Unidos",
      email: "Correo electrónico",
      phone: "Teléfono",
      phoneValue: "+1 (555) 123-4567",
    },
    businessHours: {
      title: "Horario de Atención",
      weekdays: "Lunes - Viernes: 9:00 AM - 6:00 PM",
      saturday: "Sábado: 10:00 AM - 4:00 PM",
      sunday: "Domingo: Cerrado",
    },
  },
  footer: {
    companyDescription:
      "Creando fragancias excepcionales que cuentan tu historia. Desde la elegancia clásica hasta la sofisticación moderna, cada aroma está elaborado con amor y experiencia para capturar la esencia de quién eres.",
    quickLinks: "Enlaces Rápidos",
    support: "Soporte",
    helpCenter: "Centro de Ayuda",
    documentation: "Documentación",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    legal: "Legal",
    newsletter: {
      title: "Mantente Actualizado",
      subtitle:
        "Obtén las últimas noticias y actualizaciones entregadas a tu bandeja de entrada.",
      placeholder: "Ingresa tu correo electrónico",
      subscribe: "Suscribirse",
      success: "¡Gracias por suscribirte a nuestro boletín!",
      error: "Lo sentimos, hubo un error. Por favor, inténtalo de nuevo.",
    },
    copyright: "Todos los derechos reservados.",
    privacy: "Privacidad",
    terms: "Términos",
    cookies: "Cookies",
  },
  breadcrumb: {
    home: "Inicio",
  },
  profile: {
    title: "Perfil",
    subtitle: "Gestiona la información de tu cuenta",
    personalInfo: "Información Personal",
    changePhoto: "Cambiar Foto",
    uploadPhoto: "Subir Foto",
    uploadImage: "Subir Imagen de Perfil",
    uploadHint: "Haz clic para seleccionar un archivo de imagen",
    clickToUpload: "Haz clic para subir",
    orDragAndDrop: "o arrastra y suelta",
    newImageSelected:
      "Nueva imagen seleccionada! Haz clic en 'Actualizar Perfil' para guardar.",
    imageRequirements: "JPG, PNG o GIF. Tamaño máximo 2MB.",
    fullName: "Nombre Completo",
    fullNamePlaceholder: "Ingresa tu nombre completo",
    updateProfile: "Actualizar Perfil",
    updating: "Actualizando...",
    success: {
      updated: "¡Perfil actualizado exitosamente!",
      imageSelected: "¡Imagen seleccionada! Haz clic en 'Actualizar Perfil' para guardar los cambios.",
    },
    errors: {
      failedToLoad: "Error al cargar el perfil",
      failedToUpdate: "Error al actualizar el perfil",
      unexpectedError: "Error inesperado",
    },
  },
  addresses: {
    title: "Direcciones",
    subtitle: "Gestiona tus direcciones de envío y facturación",
    yourAddresses: "Tus Direcciones",
    addAddress: "Agregar Dirección",
    editAddress: "Editar Dirección",
    deleteAddress: "Eliminar Dirección",
    noAddresses: {
      title: "No se encontraron direcciones",
      subtitle: "Comienza agregando tu primera dirección.",
      addFirst: "Agregar Dirección",
    },
    table: {
      name: "Nombre",
      location: "Ubicación",
      address: "Dirección",
      contact: "Contacto",
      default: "Predeterminada",
      actions: "Acciones",
    },
    form: {
      name: "Nombre",
      namePlaceholder: "Nombre de la dirección (ej. Casa, Oficina)",
      governorate: "Gobernación",
      governoratePlaceholder: "Gobernación/Estado",
      city: "Ciudad",
      cityPlaceholder: "Ciudad",
      address: "Dirección",
      addressPlaceholder: "Dirección de la calle, edificio, apartamento, etc.",
      postalCode: "Código Postal",
      postalCodePlaceholder: "Código postal/ZIP",
      phone: "Teléfono",
      phonePlaceholder: "Número de teléfono",
      setAsDefault: "Establecer como dirección predeterminada",
    },
    buttons: {
      add: "Agregar",
      adding: "Agregando...",
      update: "Actualizar",
      updating: "Actualizando...",
      delete: "Eliminar",
      edit: "Editar",
      cancel: "Cancelar",
      confirm: "Confirmar",
    },
    messages: {
      addSuccess: "¡Dirección agregada exitosamente!",
      updateSuccess: "¡Dirección actualizada exitosamente!",
      deleteSuccess: "¡Dirección eliminada exitosamente!",
      addError: "Error al agregar la dirección. Por favor, inténtalo de nuevo.",
      updateError: "Error al actualizar la dirección. Por favor, inténtalo de nuevo.",
      deleteError: "Error al eliminar la dirección. Por favor, inténtalo de nuevo.",
      deleteConfirm: "¿Estás seguro de que quieres eliminar esta dirección? Esta acción no se puede deshacer.",
    },
    status: {
      default: "Predeterminada",
      notDefault: "-",
    },
  },
} as const;

import LinkURL from "@/utils/nav.js";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const userHeader = () => {
  const { t } = useI18n();

  const navList = computed(() => {
    return process.env.NODE_ENV === "production"
      ? LinkURL.proUrl
      : LinkURL.devUrl;
  });

  const homeLink = navList.value.homeLink;

  const navData = computed(() => {
    return [
      {
        title: t("pools"),
        url: "",
        list: [
          {
            text: `Flash Pool (${t("ontology")})`,
            url: navList.value.pools,
            sort: "",
          },
          {
            text: `Flash Pool (${t("ethereum")})`,
            url: navList.value.ethpool,
            sort: "",
          },
          {
            text: "Flash Pool (OKC)",
            url: navList.value.okepool,
            sort: "",
          },
          {
            text: `Flash Pool (${t("bsc")})`,
            url: navList.value.bscpool,
            sort: "",
          },
          {
            text: `Flash Pool (${t("ontology_evm")})`,
            url: navList.value.ontology_evm,
            sort: "",
          },
          {
            text: t("inclusive_pool"),
            url: navList.value.inclusive,
            sort: "",
          },
          {
            text: t("any_pool"),
            url: navList.value.anypool,
            sort: "",
          },
          {
            text: t("nft_pool"),
            url: "",
            sort: "",
          },
        ],
      },
      {
        title: t("sushi"),
        url: navList.value.sushi,
        sort: "3",
      },
      {
        title: t("crosschain"),
        url: "",
        sort: "",
        list: [
          {
            text: "ONT-ONTd",
            url: navList.value.crosschain,
            sort: "",
          },
          {
            text: t("poly_network"),
            url: navList.value.poly_network,
            sort: "",
            target: "_blank",
          },
          {
            text: t("ontology_bridge"),
            url: navList.value.ontology_bridge,
            sort: "",
            target: "_blank",
          },
          {
            text: t("cBridge"),
            url: navList.value.c_bridge,
            sort: "",
            target: "_blank",
          },
          {
            text: t("anyswap"),
            url: navList.value.anyswap_bridge,
            sort: "",
            target: "_blank",
          },
        ],
      },
      {
        title: t("governance"),
        url: navList.value.governance,
        sort: "3",
      },
      {
        title: t("analytics"),
        url: "",
        sort: "",
        list: [
          {
            text: t("tvloverview"),
            url: navList.value.tvloverview,
            sort: "",
          },
          {
            text: t("wingdistribution"),
            url: navList.value.wingdistribution,
            sort: "",
          },
          {
            text: t("currentreserve"),
            url: navList.value.currentreserve,
            sort: "",
          },
          {
            text: t("recentliquidations"),
            url: navList.value.recentliquidations,
            sort: "",
          },
        ],
      },
      {
        title: t("docs"),
        url: navList.value.docs,
        sort: "3",
      },
      {
        title: t("brand"),
        url: navList.value.brand,
        sort: "3",
      },
    ];
  });

  return {
    navData,
    homeLink,
  };
};

export default userHeader;

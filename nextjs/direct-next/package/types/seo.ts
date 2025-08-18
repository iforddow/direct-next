export interface SEO {
  title: string | null | undefined;
  meta_description: string | null | undefined;
  og_image: string | null | undefined;
  focus_keyphrase: string | null | undefined;
  additional_fields: {
    canonical_url: string | null | undefined;
    custom_meta_tag: string | null | undefined;
  };
  sitemap: {
    change_frequency: string | null | undefined;
    priority: string | null | undefined;
  };
  no_index: boolean | null | undefined;
  no_follow: boolean | null | undefined;
  [key: string]: any;
}

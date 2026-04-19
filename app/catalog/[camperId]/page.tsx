import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchCamperById } from "@/lib/api/clientApi";
import CamperDetailsClient from "./CamperDetails.client";

type CamperDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: CamperDetailsProps): Promise<Metadata> {
  const { id } = await params;

  const camper = await fetchCamperById(id);

  return {
    title: `Camper: ${camper.name}`,
    description: `${camper.description?.slice(0, 32)}...`,
    openGraph: {
      title: `Note: ${camper.name}`,
      description: `${camper.description?.slice(0, 96)}...`,
      url: `/campers/${id}`, // !!!
      siteName: "TravelTrucks",
      images: [
        {
          url: "/home.jpg", // !!!
          width: 1200,
          height: 630,
          alt: "Notehub",
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `Camper: ${camper.name}`,
      description: `${camper.description?.slice(0, 16)}...`,
      images: ["/home.jpg"], // !!!
    },
  };
}

const CamperDetails = async ({ params }: CamperDetailsProps) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["camper", id],
    queryFn: () => fetchCamperById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CamperDetailsClient />
    </HydrationBoundary>
  );
};

export default CamperDetails;

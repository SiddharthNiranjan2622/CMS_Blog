import { gql, GraphQLClient } from "graphql-request";
import { NextRequest, NextResponse } from "next/server";

const graphqlAPI = process.env.graphqlAPI;

const graphcmsToken = process.env.GRAPHCMS_TOKEN;

export default async function comments(req, res) {
  console.log(req.body);
  const graphQlClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${graphcmsToken}`,
    },
  });
  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `;

  try {
    const result = await graphQlClient.request(query, req.body);
    console.log("result--------", result);
    return res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
}

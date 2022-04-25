import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Accessory = {
  __typename?: 'Accessory';
  crn: Scalars['String'];
  course_id: Scalars['String'];
  section_id: Scalars['String'];
  title: Scalars['String'];
  semester: Scalars['String'];
  year: Scalars['Float'];
  location: Scalars['String'];
  instructor: Scalars['String'];
  start_hr: Scalars['Float'];
  start_min: Scalars['Float'];
  duration: Scalars['Float'];
  days: Array<Scalars['String']>;
  status: Scalars['String'];
  section: Section;
};

export type AutocompleteName = {
  __typename?: 'AutocompleteName';
  label: Scalars['String'];
  num_avail: Scalars['String'];
  value: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserResponse;
};


export type MutationCreateUserArgs = {
  options: UserInput;
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<UserAccount>;
  users?: Maybe<Array<UserAccount>>;
  section?: Maybe<Section>;
  sections?: Maybe<Array<Section>>;
  sectionNames?: Maybe<Array<AutocompleteName>>;
  schedules?: Maybe<Array<Schedule>>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};


export type QuerySectionArgs = {
  crn: Scalars['Float'];
};


export type QuerySchedulesArgs = {
  schedule_in: ScheduleInput;
};

export type Schedule = {
  __typename?: 'Schedule';
  blocks: Array<Section>;
};

export type ScheduleInput = {
  course_ids: Array<Scalars['String']>;
  semester: Scalars['String'];
};

export type Section = {
  __typename?: 'Section';
  crn: Scalars['String'];
  course_id: Scalars['String'];
  section_id: Scalars['String'];
  title: Scalars['String'];
  semester: Scalars['String'];
  year: Scalars['Float'];
  location: Scalars['String'];
  instructor: Scalars['String'];
  start_hr: Scalars['Float'];
  start_min: Scalars['Float'];
  duration: Scalars['Float'];
  days: Array<Scalars['String']>;
  status: Scalars['String'];
  accessories?: Maybe<Array<Accessory>>;
};

export type UserAccount = {
  __typename?: 'UserAccount';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<UserAccount>;
};

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'UserAccount' }
      & Pick<UserAccount, 'id' | 'username'>
    )> }
  ) }
);

export type GetSchedulesQueryVariables = Exact<{
  schedule_in: ScheduleInput;
}>;


export type GetSchedulesQuery = (
  { __typename?: 'Query' }
  & { schedules?: Maybe<Array<(
    { __typename?: 'Schedule' }
    & { blocks: Array<(
      { __typename?: 'Section' }
      & Pick<Section, 'crn' | 'course_id' | 'section_id' | 'title' | 'days' | 'status' | 'location' | 'instructor' | 'start_hr' | 'start_min' | 'duration'>
    )> }
  )>> }
);

export type GetSectionNamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSectionNamesQuery = (
  { __typename?: 'Query' }
  & { sectionNames?: Maybe<Array<(
    { __typename?: 'AutocompleteName' }
    & Pick<AutocompleteName, 'label' | 'value' | 'num_avail'>
  )>> }
);

export type GetUserQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'UserAccount' }
    & Pick<UserAccount, 'id' | 'username' | 'email'>
  )> }
);

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users?: Maybe<Array<(
    { __typename?: 'UserAccount' }
    & Pick<UserAccount, 'id' | 'username' | 'email'>
  )>> }
);


export const CreateUserDocument = gql`
    mutation CreateUser($username: String!, $email: String!, $password: String!) {
  createUser(options: {username: $username, email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;

export function useCreateUserMutation() {
  return Urql.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument);
};
export const GetSchedulesDocument = gql`
    query getSchedules($schedule_in: ScheduleInput!) {
  schedules(schedule_in: $schedule_in) {
    blocks {
      crn
      course_id
      section_id
      title
      days
      status
      location
      instructor
      start_hr
      start_min
      duration
    }
  }
}
    `;

export function useGetSchedulesQuery(options: Omit<Urql.UseQueryArgs<GetSchedulesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSchedulesQuery>({ query: GetSchedulesDocument, ...options });
};
export const GetSectionNamesDocument = gql`
    query getSectionNames {
  sectionNames {
    label
    value
    num_avail
  }
}
    `;

export function useGetSectionNamesQuery(options: Omit<Urql.UseQueryArgs<GetSectionNamesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSectionNamesQuery>({ query: GetSectionNamesDocument, ...options });
};
export const GetUserDocument = gql`
    query getUser($id: String!) {
  user(id: $id) {
    id
    username
    email
  }
}
    `;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUserQuery>({ query: GetUserDocument, ...options });
};
export const GetUsersDocument = gql`
    query getUsers {
  users {
    id
    username
    email
  }
}
    `;

export function useGetUsersQuery(options: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetUsersQuery>({ query: GetUsersDocument, ...options });
};
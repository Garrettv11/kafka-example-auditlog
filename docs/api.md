# v1.0.0 Hapi Starter Kit API Reference

## Purpose

The purpose of this document is to describe the detailed design of the Hapi Starter Kit system API used within Science 37. This document serves as the translation of the functional requirements into a technical specification from which the system's API can be constructed.

## Scope

The scope of this document is the API of the Hapi Starter Kit example system. This includes the data it serves, and how to query data.

## Table of Contents

<!-- toc -->

- [Overview](#Overview)
- [Example Service](#ExampleService)
  - [`MyModel` Type](#MyModel)
    - [`MyModel.id`](#MyModel.id)
    - [`MyModel.description`](#MyModel.description)
  - [`MyModel REST API`](REST.md)
<!-- tocstop -->

## Overview

The Hapi Starter Kit service provides an example of a simple API which supports getting data for a fictional model named 'MyModel'.

<!-- MyModel model definition -->

## <a name="MyModel" /> `MyModel`

The MyModel type is an example model that contains several properties

### <a name="MyModel" /> `MyModel` Type

#### <a name="MyModel.id" /> `MyModel.id`

Type: `ID` (can be `String` or `Int`, though we only use `Int`)

Primary key for MyModel instances.

#### <a name="MyModel.description" /> `MyModel.description`

Type: `String`

Description text for the MyModel instance.
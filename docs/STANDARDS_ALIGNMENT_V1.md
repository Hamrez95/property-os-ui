# Property OS — Standards Alignment Notes v1

Status: RESEARCH / WORKING

## Why look at RESO

Property OS is not an MLS and should not copy an American listing schema. RESO is useful as a modeling reference because it explicitly separates:
- resources
- typed fields
- lookup/enumeration values
- relationships / expanded resources
- media
- history
- measurement sources

That pattern matches our need to avoid a flat "everything is a property field" model.

## Patterns we adopt conceptually

### 1. Resource-first modeling
Separate first-class resources instead of copying a screen form:
- Property
- Party/Member equivalent
- Media
- related collections

Property OS extends this with:
- Parcel
- Structure
- Space
- Rights
- Relationships
- Claims
- Lease
- Building operations

### 2. Typed fields + controlled lookups
Use explicit database/OpenAPI types and stable enum keys.

### 3. Related collections
Photos, rooms/spaces, history, rights and relationships should be related records rather than repeated numbered columns.

### 4. Measurement source
For values such as area, dimensions, height or year, source metadata matters.
Property OS adds stronger provenance:
- source_kind
- source_ref
- asserted_by
- captured_at
- verification level

### 5. Media semantics
Media should know what it depicts (kitchen, exterior, defect, document scan, etc.) and whether it was altered.

### 6. Transactional history
Important changes should be reconstructable, not silently overwritten.

## Patterns we explicitly do NOT adopt blindly

- MLS-specific agent/office assumptions
- US school/association fields as core
- listing-centric canonical identity
- US units as canonical units
- field proliferation without Iranian domain value

## Property OS canonical conventions

- Metric units
- PostgreSQL/OpenAPI types
- stable snake_case enum keys
- Persian/English labels localized
- external Iran registry identifiers isolated in RegistryIdentity
- visibility/provenance/verification treated as first-class concerns
